import * as React from 'react';
import styles from './CopilotHelper.module.scss';
import type { ICopilotHelperProps } from './ICopilotHelperProps';
import { useRef, useEffect } from "react";
import * as ReactWebChat from 'botframework-webchat';
import { Dispatch } from 'redux';
import { Spinner } from '@fluentui/react';
import MSALWrapper from '../../SSOAuth/MSALWrapper';
import { Card } from "@fluentui/react-components";
import { Body1,Title3} from "@fluentui/react-components";
import { useState } from "react";
//import { Title } from 'DashboardTableStrings';

const CopilotHelper: React.FC<ICopilotHelperProps> = (props) => {

    const { botURL, clientID, authority, customScope, userDisplayName, botAvatarImage, botAvatarInitials, userEmail,  agentUrl } = props;
    const [previousAgentUrl, setPreviousAgentUrl] = useState<string | null>(null);
    // Check for required properties
    if (!botURL || !clientID || !authority || !customScope) {
        return (
            <section className={styles.CopilotHelper}>
                <div style={{ textAlign: 'center', padding: '1rem', color: 'red' }}>
                    Asking Copilot to summarize about the selected Agent is not possible due to missing configuration. Please contact your administrator.
                </div>
            </section>
        );
    }


    // constructing URL using regional settings
    const environmentEndPoint = botURL.slice(0, botURL.indexOf('/powervirtualagents'));
    const apiVersion = botURL.slice(botURL.indexOf('api-version')).split('=')[1];
    const regionalChannelSettingsURL = `${environmentEndPoint}/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`;

    // Using refs instead of IDs to get the webchat and loading spinner elements
    const webChatRef = useRef<HTMLDivElement>(null);
    const loadingSpinnerRef = useRef<HTMLDivElement>(null);

    // A utility function that extracts the OAuthCard resource URI from the incoming activity or return undefined
    function getOAuthCardResourceUri(activity: any): string | undefined {
        const attachment = activity?.attachments?.[0];
        if (attachment?.contentType === 'application/vnd.microsoft.card.oauth' && attachment.content.tokenExchangeResource) {
            return attachment.content.tokenExchangeResource.uri;
        }
    }



    function PostMessage(directLine: any) {
        if (directLine) {
            directLine.postActivity({
                from: { id: userEmail, name: userDisplayName, role: "user" },
                type: "message",
                text: `Summarize  what this ${props.agentUrl} agent does?` 
            }).subscribe(
                (id: any) => console.log("Message sent successfully:", id),
                (error: any) => console.error("Error sending message:", error)
            );
        } else {
            console.error("DirectLine is not initialized.");
        }
    }



    const onDidMount = async () => {

        const MSALWrapperInstance = new MSALWrapper(props.clientID, props.authority);

        // Trying to get token if user is already signed-in
        let responseToken = await MSALWrapperInstance.handleLoggedInUser([props.customScope], props.userEmail);

        if (!responseToken) {
            // Trying to get token if user is not signed-in
            responseToken = await MSALWrapperInstance.acquireAccessToken([props.customScope], props.userEmail);
        }

        const token = responseToken?.accessToken || null;

        // Get the regional channel URL
        let regionalChannelURL;

        const regionalResponse = await fetch(regionalChannelSettingsURL);
        if (regionalResponse.ok) {
            const data = await regionalResponse.json();
            regionalChannelURL = data.channelUrlsById.directline;
        }
        else {
            console.error(`HTTP error! Status: ${regionalResponse.status}`);
        }


        // Create DirectLine object
        let directline: any;

        const response = await fetch(botURL);

        if (response.ok) {
            const conversationInfo = await response.json();
            directline = ReactWebChat.createDirectLine({
                token: conversationInfo.token,
                domain: regionalChannelURL + 'v3/directline'
            });
        } else {
            console.error(`HTTP error! Status: ${response.status}`);
        }

        const store = ReactWebChat.createStore(
            {},
            ({ dispatch }: { dispatch: Dispatch }) => (next: any) => (action: any) => {
                console.log("Action:" + action.type);
                const activity = action.payload.activity;
                console.log(activity);

                // Checking whether we should greet the user
                if (props.greet) {
                    if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
                        console.log("Action:" + action.type);
                        dispatch({
                            meta: {
                                method: "keyboard",
                            },
                            payload: {
                                activity: {
                                    channelData: {
                                        postBack: true,
                                    },
                                    //Web Chat will show the 'Greeting' System Topic message which has a trigger-phrase 'hello'
                                    name: 'startConversation',
                                    type: "event"
                                },
                            },
                            type: "DIRECT_LINE/POST_ACTIVITY",
                        });
                        return next(action);
                    }
                }

                // Checking whether the bot is asking for authentication
                if (action.type === "DIRECT_LINE/INCOMING_ACTIVITY") {
                    const activity = action.payload.activity;
                    console.log(activity);
                    const hiddenMessages = [
                        "Signing in… This would take a few seconds…",
                        "Hello, I’m Copilot Learning Center Agent, a virtual assistant. Let me summarize the selected agent for you."
                    ];

                    if (activity.text && hiddenMessages.includes(activity.text)) {
                        console.log("Blocked message:", activity.text);
                        return; 
                    }
                    if (activity?.text === "Hello, I'm Copilot Learning Center Agent, a virtual assistant. Let me summarize the selected agent for you.") {
                        PostMessage(directline);
                    }
                    if (previousAgentUrl && previousAgentUrl !== agentUrl) {
                        console.log(previousAgentUrl);
                        console.log(agentUrl);
                        PostMessage(directline);
                    }
                    if (activity.from && activity.from.role === 'bot' &&
                        (getOAuthCardResourceUri(activity))) {
                        directline.postActivity({
                            type: 'invoke',
                            name: 'signin/tokenExchange',
                            value: {
                                id: activity.attachments[0].content.tokenExchangeResource.id,
                                connectionName: activity.attachments[0].content.connectionName,
                                token
                            },
                            "from": {
                                id: props.userEmail,
                                name: props.userFriendlyName,
                                role: "user"
                            }
                        }).subscribe(
                            (id: any) => {
                                if (id === "retry") {
                                    // bot was not able to handle the invoke, so display the oauthCard (manual authentication)
                                    console.log("bot was not able to handle the invoke, so display the oauthCard")
                                    return next(action);
                                }
                            },
                            (error: any) => {
                                console.log("An error occurred so display the oauthCard");
                                return next(action);
                            }

                        )
                        return;
                    }
                } else {
                    return next(action);
                }


                return next(action);
            }
        );

        const avatarOptions = botAvatarImage && botAvatarInitials ? {
            botAvatarImage: botAvatarImage,
            botAvatarInitials: botAvatarInitials,
            userAvatarImage: `/_layouts/15/userphoto.aspx?size=S&username=${userEmail}`,
            userAvatarInitials: userDisplayName.charAt(0)
        } : {};
        const canvasStyleOptions = {
            hideUploadButton: true,
            hideSendBox: true, 
            rootHeight: '100%',
            rootWidth: '100%',
            ...avatarOptions
        }

        // Render webchat
        if (token && directline) {
            if (webChatRef.current && loadingSpinnerRef.current) {
                webChatRef.current.style.minHeight = '40vh';
                loadingSpinnerRef.current.style.display = 'none';
                ReactWebChat.renderWebChat(
                    {
                        directLine: directline,
                        store: store,
                        username: userDisplayName,
                        styleOptions: canvasStyleOptions,
                        userID: props.userEmail,
                        sendTypingIndicator: true,
                    },
                    webChatRef.current
                );
            } else {
                console.error("Webchat or loading spinner not found");
            }
        }

    };

    // Removed duplicate PostMessage function
    useEffect(() => {
        if (agentUrl && agentUrl !== previousAgentUrl) {
            console.log("New agentUrl detected:", agentUrl);
        }
        console.log('Component mounted');
        onDidMount();
        setPreviousAgentUrl(agentUrl);
        return () => {
            console.log('Component unmounted');
        };

    }, [agentUrl]);

    return (
        <Card style={{ width: 300}}>
            <Title3>Summary for {props.selectedAgentName}</Title3>
            <Body1>
                <div className={styles.chatContainer} id="chatContainer">
                    <div ref={webChatRef} role="main" className={styles.webChat}></div>
                    <div ref={loadingSpinnerRef}><Spinner label="Loading..." style={{ paddingTop: "1rem", paddingBottom: "1rem" }} /></div>
                </div>
            </Body1>
        </Card>


    );
}

export default CopilotHelper;