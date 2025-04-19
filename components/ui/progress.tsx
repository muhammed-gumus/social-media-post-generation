"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  variant?: "default" | "brutalist";
  value?: number;
}

function Progress({
  className,
  value,
  variant = "default",
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        variant === "default" &&
          "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        variant === "brutalist" &&
          "h-6 w-full bg-white border-2 border-black p-0.5 relative",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          variant === "default" &&
            "bg-primary h-full w-full flex-1 transition-all",
          variant === "brutalist" && "absolute h-full bg-[#ffde59]"
        )}
        style={{
          transform:
            variant === "default"
              ? `translateX(-${100 - (value || 0)}%)`
              : undefined,
          width: variant === "brutalist" ? `${value || 0}%` : undefined,
        }}
      />
      {variant === "brutalist" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-black">
            {Math.round(value || 0)}%
          </span>
        </span>
      )}
    </ProgressPrimitive.Root>
  );
}

export { Progress };
