import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--primary)] px-4 py-2 text-white hover:bg-[color:var(--primary-strong)] focus-visible:outline-[color:var(--primary)]",
        secondary:
          "border border-neutral-300 bg-white px-4 py-2 text-neutral-950 hover:border-neutral-500 focus-visible:outline-neutral-500",
        danger:
          "bg-[color:var(--accent)] px-4 py-2 text-white hover:bg-[#b84038] focus-visible:outline-[color:var(--accent)]",
        ghost:
          "px-3 py-2 text-neutral-700 hover:bg-neutral-100 focus-visible:outline-neutral-500"
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10",
        lg: "h-12 px-5"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
