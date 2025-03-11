import { DynamicProperty } from "@microsoft/sp-component-base";
import AIFileObject from "../../../models/AIFileObject";

export interface IAiFileDetailsProps {
  sourceAIFile: DynamicProperty<AIFileObject>;
  title?: string;
}
