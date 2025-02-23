import * as React from "react";
import styles from "../DashboardTable.module.scss";
import { TableCell } from "@fluentui/react-components";
import AIFileObject from "../../../models/AIFileObject";
import renderDisplayButton from "./renderDisplayButton";

export interface ICreateRowOperationProps {
  item: AIFileObject;
}

const createRowOperation: React.FC<ICreateRowOperationProps> = (props) => {
  const { item } = props;

  return (
    <TableCell>
      <div className={styles.rowOperations}>
        <div className={styles.rowOperation}>
          {renderDisplayButton({ item })}
        </div>
      </div>
    </TableCell>
  );
};

export default createRowOperation;
