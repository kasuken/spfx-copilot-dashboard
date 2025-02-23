import * as React from 'react';
import { TableCell, TableRow } from "@fluentui/react-components";
import AIFileObject from "../../../models/AIFileObject";
import createRowOperation from './createRowOperation';

export interface ICreateTableRowProps {
  index: number;
  columns: { columnKey: keyof AIFileObject; label: string; className?: string; formatValue?: (value: unknown) => JSX.Element; }[];
  item: AIFileObject;
}

const createTableRow = (props: ICreateTableRowProps): JSX.Element => {
  const { index, columns, item } = props;

  return (
    <TableRow key={index}>
      {columns.map(column => (
        <TableCell key={`${column.columnKey}-${index}`}>
          {column.formatValue ? column.formatValue(item[column.columnKey]) : <div>{item[column.columnKey]}</div>}
        </TableCell>
      ))}
      {createRowOperation({ item })}
    </TableRow>
  );
};

export default createTableRow;