import * as React from "react";
import { useTable, Column, useSortBy, HeaderGroup, Row, TableInstance } from "react-table";
import { Text } from "@chakra-ui/react";
import { useCallback } from "react";

// ---- TYPES

// FIXME: If table is generic, then this is a hack, because if we expect a project ID
// it means that we will use this component only for a table displaying Projects
type ClickAction = (projectId: string) => void;

interface Props {
  columns: Array<Column<any>>;
  data: any;
  onClick: ClickAction;
}

// ---- STYLE

const styles = {
  thead: { width: "100%", backgroundColor: "white" },
  tr: { border: "1px solid #e7e7e7" },
  td: { backgroundColor: "#F6F6F6", padding: "30px" },
};

// ---- COMPONENT

export const Table: React.FC<Props> = ({ columns, data, onClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} width="100%">
      <thead style={styles.thead}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => <TableHeader key={i} column={column}/>)}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, j) => <TableRow key={j} row={row} prepareRow={prepareRow} onClick={onClick} />)}
      </tbody>
    </table>
  );
};

// ---- SUB COMPONENTS

// -- Table Header

interface TableHeaderProps {
  column: HeaderGroup;
}

const TableHeader = ({ column }: TableHeaderProps) => {
  const props = column.getHeaderProps(column.getSortByToggleProps());
  const content = column.render("Header");
  const aligned = (content !== 'Titre') ? 'center' : undefined;

  return (
    <th {...props}>
      <Text variant="current" p="30px" textAlign={aligned}>
        {content}
        <span>
          {column.isSorted ? (column.isSortedDesc ? "↓" : " ↑") : ""}{" "}
        </span>
      </Text>
    </th>
  );
}

// -- Table Row

interface TableRowProps {
  row: Row,
  prepareRow: TableInstance['prepareRow'],
  onClick: ClickAction,
}

const TableRow = ({ row, prepareRow, onClick }: TableRowProps) => {
  prepareRow(row);

  // FIXME: Obviously both lines below are bad ⤵️
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore : ID does exist
  const projectId = row.original.id;
  const click = useCallback(() => onClick(projectId), [projectId, onClick]);

  return (
    <tr
      {...row.getRowProps()}
      style={styles.tr}
      onClick={click}
    >
      {row.cells.map((cell, i) => {
        const aligned = (i !== 2) ? 'center' : undefined;

        return (
          <td
            {...cell.getCellProps()}
            style={styles.td}
          >
            <Text variant="current" textAlign={aligned}>{cell.render("Cell")}</Text>
          </td>
        );
      })}
    </tr>
  );
}