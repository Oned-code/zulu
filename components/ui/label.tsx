import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      labelColor: {
        default: "text-muted-foreground",
        destructive: "text-destructive",
        outline: "text-foreground",
        secondary: "text-secondary-foreground",
        ghost: "text-foreground",
        link: "text-primary underline-offset-4 hover:underline text-primary",
      },
      labelSize: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      labelColor: "default",
      labelSize: "default",
    }
  }
);

interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color">,
    VariantProps<typeof labelVariants> {
  asChild?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, labelColor, labelSize, asChild = false, ...props }, ref) => {
    const Component = asChild ? "span" : "label";

    return (
      <Component
        className={twMerge(labelVariants({ labelColor, labelSize, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
      </Component>
    );
  }
);
Label.displayName = "Label";

export { Label, labelVariants };
