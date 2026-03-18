import { Badge, StatusBadge } from "../ui/Badge";
import { RenderAs } from "../../config/tableConfig";

interface CellRendererProps {
  value: unknown;
  renderAs?: RenderAs;
}

function formatDate(raw: string): string {
  try {
    return new Date(raw).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return raw;
  }
}

function getRoleBadgeVariant(role: string): "admin" | "manager" | "user" {
  if (role === "Admin") return "admin";
  if (role === "Manager") return "manager";
  return "user";
}

export function CellRenderer({ value, renderAs }: CellRendererProps) {
  if (value === undefined || value === null || value === "") {
    return <span className="text-gray-300">—</span>;
  }

  switch (renderAs) {
    case "boolean":
      return <StatusBadge active={Boolean(value)} />;

    case "badge":
      return (
        <Badge variant={getRoleBadgeVariant(String(value))}>
          {String(value)}
        </Badge>
      );

    case "date":
      return (
        <span className="font-mono text-xs text-gray-500">
          {formatDate(String(value))}
        </span>
      );

    default:
      return <span className="text-gray-800">{String(value)}</span>;
  }
}
