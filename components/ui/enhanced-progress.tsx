"use client";

import * as React from "react";
import { Progress } from "./progress";
import { cn } from "@/lib/utils";

interface EnhancedProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantColors = {
  default: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
};

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export function EnhancedProgress({
  value,
  max = 100,
  label,
  showValue = true,
  variant = "default",
  size = "md",
  className,
}: EnhancedProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Auto-select variant based on percentage
  const autoVariant = React.useMemo(() => {
    if (variant !== "default") return variant;
    if (percentage >= 80) return "success";
    if (percentage >= 50) return "default";
    if (percentage >= 25) return "warning";
    return "danger";
  }, [percentage, variant]);

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium text-foreground">{label}</span>}
          {showValue && (
            <span className="text-muted-foreground font-mono">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <Progress 
          value={percentage} 
          className={cn(sizeClasses[size], className)}
        />
        <div
          className={cn(
            "absolute top-0 left-0 h-full rounded-full transition-all duration-300",
            variantColors[autoVariant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}