import { useCallback, useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import dayjs from "dayjs";
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender, createColumnHelper,
  Row, Header, SortingState
} from "@tanstack/react-table";

import { SurveyRedux } from "@/redux/slices/types";
import { getLabelStatus } from "@/static/dashboard";
import { cn } from "@/lib/utils";

// ---- TYPES

interface Props {
  data: any;
  onClick: ClickAction;
}

type ClickAction = (surveyId: string) => void;

// ---- STYLE

const styles = {
  tr: { borderTop: "1px solid #e7e7e7" },
};

// ---- COMPONENT

const clmHelper = createColumnHelper<SurveyRedux>()
const columns = [
  clmHelper.accessor('attributes.status', {
    header: "Statut",
    cell: (info) => getLabelStatus(info.getValue()),
  }),
  clmHelper.accessor('attributes.createdAt', {
    header: "Date",
    cell: (info) => dayjs(info.getValue()).format("DD-MM-YYYY"),
  }),
  clmHelper.accessor('attributes.title', {
    header: "Titre",
  }),
  clmHelper.accessor(row => row.attributes.participations?.data.length, {
    header: "Total",
    cell: (info) => info.getValue() ?? 0,
  }),
]

export default function Table({ data, onClick }: Props): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([])
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <table width="100%">
      <thead className="w-full bg-white">
        {getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHeader key={header.id} header={header} />
            ))}
          </tr>
        ))}
      </thead>

      <Tooltip label="Cliquer pour éditer les paramètres du projet" placement="top-start">
        <tbody>
          {getRowModel().rows.map(row => (
            <TableRow key={row.id} row={row} onClick={onClick} />
          ))}
        </tbody>
      </Tooltip>
    </table>
  );
};

// ---- SUB COMPONENTS

// -- Table Header

interface TableHeaderProps {
  header: Header<SurveyRedux, unknown>
}

const TableHeader = ({ header }: TableHeaderProps) => {
  const content = flexRender(
    header.column.columnDef.header,
    header.getContext()
  )

  const aligned = content !== "Titre" ? "text-center" : undefined
  const width = content !== "Titre" ? "w-[150px]" : undefined

  const sortSymbol = {
    asc: " ↑", desc: " ↓",
  }[header.column.getIsSorted() as string] ?? null

  return (
    <th
      className={cn(
        width, aligned,
        "text-sm cursor-pointer p-[30px] font-normal hover:font-bold"
      )}
      onClick={header.column.getToggleSortingHandler()}
    >
      {content}{sortSymbol}
    </th>
  );
};

// -- Table Row

interface TableRowProps {
  row: Row<SurveyRedux>
  onClick: ClickAction;
}

const TableRow = ({ row, onClick }: TableRowProps) => {
  const surveyId = row.original.id;
  const click = useCallback(() => onClick(surveyId), [surveyId, onClick]);

  return (
    <tr style={styles.tr} onClick={click} className="cursor-pointer bg-slate-100 hover:bg-slate-200">
      {row.getVisibleCells().map((cell, i) => {
        const aligned = i !== 2 ? "text-center" : undefined;

        return (
          <td
            key={cell.id}
            className={cn( aligned, "p-[30px] text-sm font-normal" )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};
