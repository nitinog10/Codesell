import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-md border border-neutral-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[#1f8a7026]",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
