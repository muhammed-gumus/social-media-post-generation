import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: "default" | "brutalist" | "outline" | "minimal";
  label?: string;
  error?: string;
}

const SelectBasic = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, variant = "default", label, error, children, ...props },
    ref
  ) => {
    const id = React.useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block mb-2 text-sm font-bold">
            {label}
          </label>
        )}
        <select
          id={id}
          className={cn(
            "flex h-9 w-full text-sm transition-colors duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            variant === "default" &&
              "rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            variant === "brutalist" &&
              "w-full p-3 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            variant === "outline" &&
              "border border-black bg-transparent px-3 py-2",
            variant === "minimal" &&
              "border-b border-input bg-transparent px-3 py-2 focus:border-black",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
SelectBasic.displayName = "SelectBasic";

export { SelectBasic };
