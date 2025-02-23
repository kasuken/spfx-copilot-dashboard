import * as React from 'react';
import styles from './DashboardTable.module.scss';

import {
  TableBody,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell
} from "@fluentui/react-components";
import getTableColumns from './functions/getTableColumns';
import createTableRow from './functions/createTableRow';
import AIFileObject from '../../models/AIFileObject';

export interface IDashboardTableProps {
  items: AIFileObject[];
  disabled?: boolean;
}

const DashboardTable: React.FC<IDashboardTableProps> = (props) => {
  const { items } = props;

  const columns = getTableColumns();

  return (
    <section className={styles.dashboardTable}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey} className={column.className}>{column.label}</TableHeaderCell>
            ))}
            <TableHeaderCell className={styles.operationColumnHeader} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            createTableRow({ index, columns, item })
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default DashboardTable;
