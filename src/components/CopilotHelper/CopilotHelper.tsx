import * as React from 'react';
import styles from './CopilotHelper.module.scss';
import type { ICopilotHelperProps } from './ICopilotHelperProps';
import { useRef, useEffect } from "react";
import * as ReactWebChat from 'botframework-webchat';
import { Dispatch } from 'redux';
import { Spinner } from '@fluentui/react';
import MSALWrapper from '../../SSOAuth/MSALWrapper';
import { useState } from "react";
import { Panel, PanelType } from '@fluentui/react/lib/Panel';

const CopilotHelper: React.FC<ICopilotHelperProps> = (props) => {

    const { botURL, clientID, authority, customScope, userDisplayName, botAvatarImage, botAvatarInitials, userEmail, agentUrl, isOpen, onDismiss } = props;
    const [previousAgentUrl, setPreviousAgentUrl] = useState<string | null>(null);
    const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
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

    // Using refs instead of IDs to get the webchat and loading spinner elements
    const webChatRef = useRef<HTMLDivElement>(null);
    const loadingSpinnerRef = useRef<HTMLDivElement>(null);

    // A utility function that extracts the OAuthCard resource URI from the incoming activity or return undefined
    const getOAuthCardResourceUri = (activity: any): string | undefined => {
        const attachment = activity?.attachments?.[0];
        if (attachment?.contentType === 'application/vnd.microsoft.card.oauth' && attachment.content.tokenExchangeResource) {
            return attachment.content.tokenExchangeResource.uri;
        }
    }



    const PostMessage = (directLine: any) =>{
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

    const fetchToken = async (): Promise<string> => {
        try {
            const MSALWrapperInstance = new MSALWrapper(props.clientID, props.authority);

            const responseToken = await MSALWrapperInstance.handleLoggedInUser([props.customScope], userEmail) ||
                await MSALWrapperInstance.acquireAccessToken([props.customScope], userEmail);

            if (!responseToken || !responseToken.accessToken) {
                throw new Error('Failed to fetch access token.');
            }

            return responseToken.accessToken;
        } catch (error) {
            console.error('Error fetching token:', error);
            setIsTokenExpired(true); // Show dialog for expired token
            throw error; // Rethrow to let ErrorBoundary handle it
        }
    };


    const getRegionalChannelURL = async (): Promise<string> => {
        const environmentEndPoint = botURL.slice(0, botURL.indexOf('/powervirtualagents'));
        const apiVersion = botURL.slice(botURL.indexOf('api-version')).split('=')[1];
        const regionalChannelSettingsURL = `${environmentEndPoint}/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`;

        const regionalResponse = await fetch(regionalChannelSettingsURL);
        if (!regionalResponse.ok) {
            throw new Error(`HTTP error! Status: ${regionalResponse.status}`);
        }

        const data = await regionalResponse.json();
        return data.channelUrlsById.directline;
    };

    const createDirectLine = async (botURL: string, regionalChannelURL: string) => {
        try {
            const response = await fetch(botURL);
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Access Forbidden: Token might be invalid or expired.');
                } else if (response.status === 404) {
                    throw new Error('Bot service not found. Check bot URL configuration.');
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }

            const conversationInfo = await response.json();
            return (window as any).WebChat.createDirectLine({
                token: conversationInfo.token,
                domain: `${regionalChannelURL}v3/directline`,
            });
        } catch (error) {
            console.error('Failed to create DirectLine:', error);
            setIsTokenExpired(true);
            throw error; // Pass the error up to the boundary
        }
    };

    const createWebChatStore  = (token: string, directline: any) => {
        return ReactWebChat.createStore(
            {},
            ({ dispatch }: { dispatch: Dispatch }) => (next: any) => (action: any) => {
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

                if (action.type === "DIRECT_LINE/POST_ACTIVITY_REJECTED") {
                    // eslint-disable-next-line no-console
                    console.warn("Token may have expired. Attempting to refresh token...");

                    // Call your token refresh logic
                    fetchToken()
                        .then((newToken) => {
                            // eslint-disable-next-line no-console
                            console.log("Token refreshed successfully. Reconnecting...");

                            // Reinitialize Direct Line with the new token
                            dispatch({
                                type: "WEB_CHAT/SEND_TOKEN",
                                payload: {
                                    token: newToken,
                                },
                            });
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.error("Token refresh failed:", error);
                            // Handle failure to refresh token (e.g., log out user)
                            setIsTokenExpired(true);
                        });

                    return;
                }


                return next(action);
            }
        );
    };


    const handleLayerDidMount = async () => {
        // Fetch token
        const token = await fetchToken();

        console.log(isTokenExpired);
        // Get the regional channel URL
        const regionalChannelURL = await getRegionalChannelURL();

        // Create DirectLine object
        const directline = await createDirectLine(botURL, regionalChannelURL);

        const store = createWebChatStore(token, directline);

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
        handleLayerDidMount();
        setPreviousAgentUrl(agentUrl);
        return () => {
            console.log('Component unmounted');
        };

    }, [agentUrl]);

    return (
        <Panel
            type={PanelType.medium}
            onDismiss={(ev)=> onDismiss(ev)}
            isOpen={isOpen}
            headerText={`Summary for ${props.selectedAgentName}`}
            isBlocking={false}
        >
            <div className={styles.chatContainer} id="chatContainer">
                <div ref={webChatRef} role="main" className={styles.webChat}></div>
                <div ref={loadingSpinnerRef}><Spinner label="Loading..." style={{ paddingTop: "1rem", paddingBottom: "1rem" }} /></div>
            </div>
        </Panel>

    );
}

export default CopilotHelper;