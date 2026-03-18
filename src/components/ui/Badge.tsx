import { cn } from "../../lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "admin" | "manager" | "user";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:  "bg-gray-100 text-gray-600",
  admin:    "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  manager:  "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  user:     "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variantStyles[variant])}>
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  active: boolean;
}

export function StatusBadge({ active }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        active
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          : "bg-red-50 text-red-600 ring-1 ring-red-200"
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-emerald-500" : "bg-red-400")} />
      {active ? "Active" : "Inactive"}
    </span>
  );
}
