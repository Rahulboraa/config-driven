export type RenderAs = "boolean" | "date" | "badge" | "text";

export interface ColumnConfig {
  accessorKey: string;
  header: string;
  renderAs?: RenderAs;
  enableSorting?: boolean;
}

export interface TableConfig {
  columns: ColumnConfig[];
}

export interface UserRecord {
  name: string;
  age: number;
  role: string;
  department?: string;
  isActive: boolean;
  joiningDate: string;
}

export const userTableConfig: TableConfig = {
  columns: [
    { accessorKey: "name",        header: "Name",         enableSorting: true },
    { accessorKey: "age",         header: "Age",          enableSorting: true },
    { accessorKey: "role",        header: "Role",         renderAs: "badge",   enableSorting: true },
    { accessorKey: "department",  header: "Department",   enableSorting: true },
    { accessorKey: "isActive",    header: "Status",       renderAs: "boolean", enableSorting: true },
    { accessorKey: "joiningDate", header: "Joining Date", renderAs: "date",    enableSorting: true },
  ],
};

export const initialData: UserRecord[] = [
  { name: "John Doe",      age: 28, role: "Admin",   department: "Engineering", isActive: true,  joiningDate: "2023-01-15" },
  { name: "Priya Sharma",  age: 34, role: "Manager", department: undefined,     isActive: true,  joiningDate: "2021-06-01" },
  { name: "Alex Chen",     age: 25, role: "User",    department: undefined,     isActive: false, joiningDate: "2024-03-10" },
  { name: "Sarah Johnson", age: 31, role: "User",    department: undefined,     isActive: true,  joiningDate: "2022-11-20" },
];
