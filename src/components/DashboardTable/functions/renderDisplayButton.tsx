import * as React from "react";
import { Button } from "@fluentui/react-components";
import { ChatRegular } from "@fluentui/react-icons";
import AIFileObject from "../../../models/AIFileObject";
import { AIFilesContext } from "../../../context/AIFilesContext";

export interface IRenderDisplayButtonProps {
	item: AIFileObject;
}

const renderDisplayButton: React.FC<IRenderDisplayButtonProps> = (props) => {
	const { item } = props;
	const { setSelectedAiFile } = React.useContext(AIFilesContext);

	if (!item || !item.DefaultEncodingUrl || item.DefaultEncodingUrl.length === 0) {
		return <></>;
	}

	return (
		<Button
			icon={<ChatRegular />}
			onClick={() => {
				setSelectedAiFile(item);
			}}
		/>
	);
};

export default renderDisplayButton;
