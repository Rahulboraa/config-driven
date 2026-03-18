import { useState } from "react";
import { Users, UserPlus } from "lucide-react";
import { FormRenderer } from "./components/FormRenderer/FormRenderer";
import { DataTable } from "./components/DataTable/DataTable";
import { userFormSchema } from "./config/formSchema";
import { userTableConfig, UserRecord } from "./config/tableConfig";
import { useUserStore } from "./store/userStore";
import { InferredFormValues } from "./utils/schemaBuilder";
import { cn } from "./lib/cn";

type Tab = "form" | "table";

const tabs: { id: Tab; label: string; icon: typeof UserPlus }[] = [
  { id: "form",  label: "Add User",  icon: UserPlus },
  { id: "table", label: "All Users", icon: Users },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("form");
  const { users, addUser } = useUserStore();

  const handleFormSubmit = (data: InferredFormValues) => {
    const user: UserRecord = {
      name:        String(data.name ?? ""),
      age:         Number(data.age ?? 0),
      role:        String(data.role ?? "User"),
      department:  data.department ? String(data.department) : undefined,
      isActive:    Boolean(data.isActive ?? false),
      joiningDate: String(data.joiningDate ?? ""),
    };
    addUser(user);
    setActiveTab("table");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">
            Config-Driven UI
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Dynamic form and table rendered from JSON schema
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200 px-1 pt-1 gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none",
                  activeTab === id
                    ? "bg-white text-brand-600 border-b-2 border-brand-600 -mb-px"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
                {id === "table" && (
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-xs tabular-nums",
                    activeTab === "table" ? "bg-brand-50 text-brand-600" : "bg-gray-100 text-gray-500"
                  )}>
                    {users.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "form" ? (
              <FormRenderer schema={userFormSchema} onSubmit={handleFormSubmit} />
            ) : (
              <DataTable config={userTableConfig} data={users} />
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Schema defined in <code className="font-mono">src/config/</code> — no UI changes needed to add fields or columns
        </p>
      </div>
    </div>
  );
}
