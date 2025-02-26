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
import { AIFileDetails } from '../AIFileDetails/AIFileDetails';
import { AIFileContext, AIFileContextProvider } from '../../context/AIFileContext';


export interface IDashboardTableProps {
  items: AIFileObject[];
  disabled?: boolean;
}

const DashboardTable: React.FC<IDashboardTableProps> = (props) => {
  const { items } = props;
  const { selectedItem, setSelectedItem } = React.useContext(AIFileContext);
  const columns = getTableColumns();
  return (
    <AIFileContextProvider searchResultItems={items}>
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

        <AIFileDetails
          isOpen={selectedItem !== undefined}
          onDismiss={() => { setSelectedItem(undefined); }}
        />
      </section>
    </AIFileContextProvider>
  );
};

export default DashboardTable;
