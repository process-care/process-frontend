import * as React from "react";
import { useTable, Column, useSortBy } from "react-table";
import { Text } from "@chakra-ui/react";

interface Props {
  columns: Array<Column<any>>;
  data: any;
}

export const Table: React.FC<Props> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} width="100%">
      <thead style={{ width: "100%", backgroundColor: "white" }}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <Text variant="current" p="30px">
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "↓" : " ↑") : ""}{" "}
                  </span>
                </Text>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={i}
              style={{ border: "1px solid #e7e7e7" }}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      backgroundColor: "#F6F6F6",
                      padding: "30px",
                    }}
                  >
                    <Text variant="current">{cell.render("Cell")}</Text>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
