import * as React from "react";
import * as strings from "DashboardTableStrings";
import AIFileObject from "../../../models/AIFileObject";
import { IColumn } from "@fluentui/react";
import getPropertyName from "../../../utilities/getPropertyName";
import renderDisplayButton from "./renderDisplayButton";
import renderParentLinkButton from "./renderParentLinkButton";

const getTableColumns = (): IColumn[] => {
	return [
		{
			key: "typeColumn",
			name: strings.AIFileObject.FileExtension,
			fieldName: getPropertyName<AIFileObject>("FileExtension"),
			minWidth: 40,
			maxWidth: 40,
			isResizable: true,
			onRender: (item: AIFileObject) => {
				if (!item || !item.FileExtension) {
					return undefined;
				}

				const srcValue =
					item.FileExtension === "copilot"
						? require("../../svgs/CopilotIcon.svg")
						: require("../../svgs/AgentIcon.svg");

				return React.createElement("img", {
					src: srcValue,
					title: item.FileExtension,
				});
			},
		},
		{
			key: "nameColumn",
			name: strings.AIFileObject.Name,
			fieldName: getPropertyName<AIFileObject>("Name"),
			minWidth: 200,
			isResizable: true,
		},
		{
			key: "createdByColumn",
			name: strings.AIFileObject.CreatedBy,
			fieldName: getPropertyName<AIFileObject>("CreatedBy"),
			minWidth: 150,
			isResizable: true,
		},
		{
			key: "parentLinkColumn",
			name: strings.AIFileObject.ParentLink,
			fieldName: getPropertyName<AIFileObject>("ParentLink"),
			minWidth: 50,
			isResizable: true,
			onRender: (item: AIFileObject) => {
				return renderParentLinkButton({ item });
			},
		},
		{
			key: "operationButton",
			name: "",
			minWidth: 50,
			isResizable: true,
			onRender: (item: AIFileObject) => {
				return renderDisplayButton({ item });
			},
		},
	];
};

export default getTableColumns;