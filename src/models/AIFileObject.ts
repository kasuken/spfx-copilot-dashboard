export default class AIFileObject {
  Name: string;
  FileExtension: 'copilot' | 'agent';
  DefaultEncodingUrl: string;
  ParentLink: string;
  SPSiteURL: string;
  CopilotAgentUrl: string;
}

export type AIFileObjects = {
  value: AIFileObject[];
}