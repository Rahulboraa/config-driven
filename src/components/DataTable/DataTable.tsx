import { flexRender } from "@tanstack/react-table";
import { TableConfig, UserRecord, ColumnConfig } from "../../config/tableConfig";
import { useDataTable } from "./useDataTable";
import { TableToolbar, TablePagination, TableEmptyState, SortableHeader } from "./TableParts";
import { CellRenderer } from "./CellRenderer";

interface DataTableProps {
  config: TableConfig;
  data: UserRecord[];
}

export function DataTable({ config, data }: DataTableProps) {
  const {
    table,
    globalFilter,
    setGlobalFilter,
    pageSize,
    handlePageSizeChange,
    totalFiltered,
  } = useDataTable(config, data);

  const columnConfigMap = new Map<string, ColumnConfig>(
    config.columns.map((c) => [c.accessorKey, c])
  );

  const rows = table.getRowModel().rows;

  return (
    <div className="flex flex-col gap-4">
      <TableToolbar
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
        totalFiltered={totalFiltered}
        table={table}
      />

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-gray-200 bg-gray-50">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    <SortableHeader
                      canSort={header.column.getCanSort()}
                      isSorted={header.column.getIsSorted()}
                      onToggleSort={() => header.column.toggleSorting()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </SortableHeader>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {rows.length === 0 ? (
              <TableEmptyState colSpan={table.getAllLeafColumns().length} />
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-gray-50/70">
                  {row.getVisibleCells().map((cell) => {
                    const colConf = columnConfigMap.get(cell.column.id);
                    return (
                      <td key={cell.id} className="px-4 py-3.5 align-middle">
                        <CellRenderer
                          value={cell.getValue()}
                          renderAs={colConf?.renderAs}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        table={table}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
