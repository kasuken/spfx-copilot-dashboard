import * as React from "react";
import { Button } from "@fluentui/react-components";
import { FolderRegular } from "@fluentui/react-icons";
import AIFileObject from "../../../models/AIFileObject";

export interface IRenderParentLinkButtonProps {
	item: AIFileObject;
}

const renderParentLinkButton: React.FC<IRenderParentLinkButtonProps> = (props) => {
	const { item } = props;

	if (!item || !item.ParentLink || item.ParentLink.length === 0) {
		return <></>;
	}

	return (
		<Button
			icon={<FolderRegular />}
			onClick={() => {
				window.open(item.ParentLink, "_blank");
			}}
		/>
	);
};

export default renderParentLinkButton;
