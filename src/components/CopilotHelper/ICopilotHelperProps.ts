export interface ICopilotHelperProps {
    botName: string;
    botURL: string;
    clientID: string;
    authority: string;
    customScope: string;
    userEmail: string;
    userFriendlyName: string;
    greet: boolean;
    userDisplayName: string;
    botAvatarImage: string;
    botAvatarInitials: string;
    welcomeMessage:string;
    agentUrl:string;
    selectedAgentName:string;
    isOpen: boolean;
    onDismiss: (e: any) => void; 
}