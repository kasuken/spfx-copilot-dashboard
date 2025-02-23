import * as strings from "DashboardTableStrings";
import styles from "../DashboardTable.module.scss";
import AIFileObject from "../../../models/AIFileObject";

export interface IDashboardColumn {
	columnKey: keyof AIFileObject;
	label: string;
	className?: string;
	formatValue?: (value: unknown) => JSX.Element;
}

const getTableColumns = (): IDashboardColumn[] => {
	return [
		{
			columnKey: "Name",
			label: strings.AIFileObject.Name,
			className: styles.nameColumn,
		},
	];
};

export default getTableColumns;