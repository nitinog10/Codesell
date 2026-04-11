import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs font-semibold text-neutral-700",
        className
      )}
    >
      {children}
    </span>
  );
}
