import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  VisibilityState,
  FilterFn,
  Row,
} from "@tanstack/react-table";
import { TableConfig, UserRecord } from "../../config/tableConfig";

const globalFilterFn: FilterFn<UserRecord> = (row: Row<UserRecord>, _columnId: string, filterValue: string) =>
  Object.values(row.original).some((val) =>
    String(val ?? "").toLowerCase().includes(filterValue.toLowerCase())
  );

export function useDataTable(config: TableConfig, data: UserRecord[]) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const columns = useMemo<ColumnDef<UserRecord>[]>(() =>
    config.columns.map((col) => ({
      accessorKey: col.accessorKey,
      header: col.header,
      enableSorting: col.enableSorting ?? true,
      meta: { renderAs: col.renderAs },
    })),
    [config]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, globalFilter },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    table.setPageSize(size);
  };

  return {
    table,
    globalFilter,
    setGlobalFilter,
    pageSize,
    handlePageSizeChange,
    totalFiltered: table.getFilteredRowModel().rows.length,
  };
}
