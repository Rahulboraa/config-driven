import { useState, useRef, useEffect } from "react";
import { Table } from "@tanstack/react-table";
import { Search, SlidersHorizontal, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { UserRecord } from "../../config/tableConfig";
import { cn } from "../../lib/cn";

interface TableToolbarProps {
  globalFilter: string;
  onFilterChange: (val: string) => void;
  totalFiltered: number;
  table: Table<UserRecord>;
}

export function TableToolbar({ globalFilter, onFilterChange, totalFiltered, table }: TableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 tabular-nums">
          {totalFiltered} row{totalFiltered !== 1 ? "s" : ""}
        </span>
        <ColumnVisibilityToggle table={table} />
      </div>
    </div>
  );
}

interface ColumnVisibilityToggleProps {
  table: Table<UserRecord>;
}

function ColumnVisibilityToggle({ table }: ColumnVisibilityToggleProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        Columns
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[160px] rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
          {table.getAllLeafColumns().map((col) => (
            <label
              key={col.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={col.getIsVisible()}
                onChange={col.getToggleVisibilityHandler()}
                className="h-3.5 w-3.5 rounded border-gray-300"
              />
              {col.id}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

interface SortIconProps {
  direction: "asc" | "desc" | false;
}

export function SortIcon({ direction }: SortIconProps) {
  if (direction === "asc") return <ChevronUp className="ml-1 h-3 w-3" />;
  if (direction === "desc") return <ChevronDown className="ml-1 h-3 w-3" />;
  return <ChevronsUpDown className="ml-1 h-3 w-3 text-gray-300" />;
}

interface TablePaginationProps {
  table: Table<UserRecord>;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export function TablePagination({ table, pageSize, onPageSizeChange }: TablePaginationProps) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const btnBase =
    "flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300";

  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Rows per page</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[5, 10, 20].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500 tabular-nums mr-1">
          Page {pageIndex + 1} of {pageCount || 1}
        </span>
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className={btnBase} aria-label="First">«</button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className={btnBase} aria-label="Prev">‹</button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className={btnBase} aria-label="Next">›</button>
        <button onClick={() => table.setPageIndex(pageCount - 1)} disabled={!table.getCanNextPage()} className={btnBase} aria-label="Last">»</button>
      </div>
    </div>
  );
}

export function TableEmptyState({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center text-sm text-gray-400">
        No records found
      </td>
    </tr>
  );
}

interface SortableHeaderProps {
  canSort: boolean;
  isSorted: "asc" | "desc" | false;
  onToggleSort: () => void;
  children: React.ReactNode;
}

export function SortableHeader({ canSort, isSorted, onToggleSort, children }: SortableHeaderProps) {
  return (
    <div
      className={cn("flex items-center", canSort && "cursor-pointer select-none hover:text-gray-700")}
      onClick={canSort ? onToggleSort : undefined}
    >
      {children}
      {canSort && <SortIcon direction={isSorted} />}
    </div>
  );
}
