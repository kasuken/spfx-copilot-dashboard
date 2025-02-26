import * as React from "react";
import { Button } from "@fluentui/react-components";
import { DocumentRegular } from "@fluentui/react-icons";
import AIFileObject from "../../../models/AIFileObject";
import { AIFileContext } from "../../../context/AIFileContext";

export interface IRenderDisplayButtonProps {
	item: AIFileObject;
}

const renderDisplayButton: React.FC<IRenderDisplayButtonProps> = (props) => {
	const { item } = props;
	const { setSelectedItem } = React.useContext(AIFileContext);

	return (
		<Button
			icon={<DocumentRegular />}
			onClick={() => {
                setSelectedItem(item);
			}}
		/>
	);
};

export default renderDisplayButton;
