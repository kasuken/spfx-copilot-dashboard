import * as strings from "DashboardTableStrings";
//import styles from "../DashboardTable.module.scss";
import AIFileObject from "../../../models/AIFileObject";
import { IColumn } from "@fluentui/react";
import getPropertyName from "../../../utilities/getPropertyName";
import renderDisplayButton from "./renderDisplayButton";

export interface IDashboardColumn {
	columnKey: keyof AIFileObject;
	label: string;
	className?: string;
	formatValue?: (value: unknown) => JSX.Element;
}

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