import * as React from "react";
import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "border-destructive text-destructive hover:border-destructive/50",
        outline:
          "border-border hover:border-accent/50",
        secondary:
          "border-secondary text-secondary hover:border-secondary/50",
        ghost:
          "hover:border-accent/50 hover:bg-accent/50",
        link:
          "border-bottom border-b-transparent hover:border-primary",
      },
      inputSize: {
        default: "h-10 px-3 py-2",
        sm: "h-9 px-2",
        lg: "h-11 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    }
  }
)

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, asChild = false, ...props }, ref) => {
    const Component = asChild ? "span" : "input";

    return (
      <Component
        className={twMerge(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
      </Component>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
