import * as React from "react";
import { Button } from "@fluentui/react-components";
import { DocumentRegular } from "@fluentui/react-icons";
import AIFileObject from "../../../models/AIFileObject";

export interface IRenderDisplayButtonProps {
  item: AIFileObject;
}

const renderDisplayButton: React.FC<IRenderDisplayButtonProps> = (props) => {
	const { item } = props;

  return (
		<Button
			icon={<DocumentRegular />}
			onClick={() => {
				// TODO: Implement the display button click handler
				alert("TODO: Implement the display button click handler");

				console.log("item", item);
				//Opens the Copilot Agent URL in a new tab
				window.open(item.CopilotAgentUrl, "_blank");
			}}
			/>
	);
};

export default renderDisplayButton;
