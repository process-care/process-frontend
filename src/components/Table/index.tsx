import * as React from "react";
import {
  useTable,
  Column,
  useSortBy,
  HeaderGroup,
  Row,
  TableInstance,
} from "react-table";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";
import { Survey } from "redux/slices/surveyBuilder";

// ---- TYPES

// FIXME: If table is generic, then this is a hack, because if we expect a project ID
// it means that we will use this component only for a table displaying Projects
type ClickAction = (survey: Survey["survey"]) => void;

interface Props {
  columns: Array<Column<any>>;
  data: any;
  onClick: ClickAction;
}

// ---- STYLE

const styles = {
  thead: { width: "100%", backgroundColor: "white" },
  tr: { border: "1px solid #e7e7e7" },
  td: { backgroundColor: "#F6F6F6" },
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
            {headerGroup.headers.map((column, i) => (
              <TableHeader key={i} column={column} />
            ))}
          </tr>
        ))}
      </thead>
      <Tooltip
        label="Cliquer pour éditer les paramètres de l'enquête"
        placement="top-start"
      >
        <tbody {...getTableBodyProps()}>
          {rows.map((row, j) => (
            <TableRow
              key={j}
              row={row}
              prepareRow={prepareRow}
              onClick={onClick}
            />
          ))}
        </tbody>
      </Tooltip>
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
  const aligned = content !== "Titre" ? "center" : undefined;

  return (
    <th {...props}>
      <Text variant="current" p="30px" textAlign={aligned}>
        {content}
        <span>
          {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : " ↓"}{" "}
        </span>
      </Text>
    </th>
  );
};

// -- Table Row

interface TableRowProps {
  row: Row;
  prepareRow: TableInstance["prepareRow"];
  onClick: ClickAction;
}

const TableRow = ({ row, prepareRow, onClick }: TableRowProps) => {
  prepareRow(row);

  // FIXME: Obviously both lines below are bad ⤵️
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore : ID does exist
  const survey: Survey["survey"] = row.original;
  const click = useCallback(() => onClick(survey), [survey, onClick]);

  return (
    <tr {...row.getRowProps()} style={styles.tr} onClick={click}>
      {row.cells.map((cell, i) => {
        const aligned = i !== 2 ? "center" : undefined;

        return (
          <td {...cell.getCellProps()} style={styles.td}>
            <Box p="30px" _hover={{ cursor: "pointer" }}>
              <Text variant="current" textAlign={aligned}>
                {cell.render("Cell")}
              </Text>
            </Box>
          </td>
        );
      })}
    </tr>
  );
};
