import * as strings from "DashboardTableStrings";
import AIFileObject from "../../../models/AIFileObject";
import { IColumn } from "@fluentui/react";
import getPropertyName from "../../../utilities/getPropertyName";
import renderDisplayButton from "./renderDisplayButton";

const getTableColumns = (): IColumn[] => {
	return [
		{
			key: "nameColumn",
			name: strings.AIFileObject.Name,
			fieldName: getPropertyName<AIFileObject>("Name"),
			minWidth: 100,
			isResizable: true,
		},
		{
			key: "operationButton",
			name: "",
			minWidth: 100,
			isResizable: true,
			onRender: (item: AIFileObject) => {
				return renderDisplayButton({ item });
			},
		},
	];
};

export default getTableColumns;