import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-normal rounded-lg text-center text-sm font-bold leading-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-pine text-white shadow-lift hover:-translate-y-0.5 hover:bg-pine-900",
        secondary: "bg-charcoal text-white hover:-translate-y-0.5 hover:bg-black",
        outline: "border border-charcoal/15 bg-white text-charcoal hover:-translate-y-0.5 hover:border-pine hover:text-pine",
        ghost: "text-charcoal hover:bg-white/70 hover:text-pine",
        light: "bg-white text-charcoal shadow-soft hover:-translate-y-0.5 hover:text-pine"
      },
      size: {
        default: "min-h-11 px-5 py-2.5",
        sm: "min-h-9 px-4 py-2",
        lg: "min-h-12 px-7 py-3 text-base",
        xl: "min-h-14 px-7 py-3.5 text-base sm:px-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

export { Button, buttonVariants };
