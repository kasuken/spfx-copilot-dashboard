import { DynamicProperty } from "@microsoft/sp-component-base";
import AIFileObject from "../../../models/AIFileObject";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAiFileDetailsProps {
  sourceAIFile: DynamicProperty<AIFileObject>;
  title?: string;
  hideWebpartIfEmpty?: boolean;
  context: WebPartContext;
}

export interface IAiFileDetailsState {
  // eslint-disable-next-line @rushstack/no-new-null
  aiFile: { value: AIFileObject[] } | null;
  gptDefinition : any;
  error: string;
  showCopilotHelper: boolean;
}
