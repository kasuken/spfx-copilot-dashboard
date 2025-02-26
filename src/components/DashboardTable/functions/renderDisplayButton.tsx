import * as React from "react";
import { Button } from "@fluentui/react-components";
import { DocumentRegular } from "@fluentui/react-icons";
import AIFileObject from "../../../models/AIFileObject";
import { AIFilesContext } from "../../../context/AIFilesContext";

export interface IRenderDisplayButtonProps {
	item: AIFileObject;
}

const renderDisplayButton: React.FC<IRenderDisplayButtonProps> = (props) => {
	const { item } = props;
	const { selectedAiFile, setSelectedAiFile } = React.useContext(AIFilesContext);

	console.log(selectedAiFile);
	return (
		<Button
			icon={<DocumentRegular />}
			onClick={() => {
				setSelectedAiFile(item);
			}}
		/>
	);
};

export default renderDisplayButton;
