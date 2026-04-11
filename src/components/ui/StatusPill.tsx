import { cn } from "@/lib/utils";

const variants = {
  PENDING: "border-[#d6b441] bg-[#fff8d8] text-[#6e5a0d]",
  PAID: "border-[#75b798] bg-[#e5f6ed] text-[#146c43]",
  FAILED: "border-[#e4a29a] bg-[#fff3f1] text-[#8f2d24]",
  REFUNDED: "border-neutral-300 bg-white text-neutral-700",
  SENT: "border-[#75b798] bg-[#e5f6ed] text-[#146c43]",
  ACCEPTED: "border-[#75b798] bg-[#e5f6ed] text-[#146c43]"
} as const;

export function StatusPill({
  status,
  className
}: {
  status: keyof typeof variants | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2 py-1 text-xs font-semibold",
        variants[status as keyof typeof variants] ??
          "border-neutral-300 bg-white text-neutral-700",
        className
      )}
    >
      {status.toLowerCase()}
    </span>
  );
}
