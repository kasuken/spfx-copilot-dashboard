export default class AIFileObject {
  Name: string;
  FileUrl: string;
  FileExtension: 'copilot' | 'agent';
}

export type AIFileObjects = {
  value: AIFileObject[];
}