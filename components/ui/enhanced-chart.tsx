"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { EmptyState } from "./empty-state";
import { BarChart3 } from "lucide-react";

interface EnhancedChartProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
  className?: string;
  actions?: React.ReactNode;
}

export const EnhancedChart = React.memo(function EnhancedChart({
  title,
  description,
  children,
  isEmpty,
  emptyMessage,
  className,
  actions,
}: EnhancedChartProps) {
  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-shadow", className)}>
      {(title || actions) && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            {title && <CardTitle className="card-title">{title}</CardTitle>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </CardHeader>
      )}
      <CardContent className="pt-4">
        {isEmpty ? (
          <EmptyState
            icon={BarChart3}
            title="No data available"
            description={emptyMessage || "There's no data to display yet."}
            className="min-h-[300px]"
          />
        ) : (
          <div className="w-full h-full">{children}</div>
        )}
      </CardContent>
    </Card>
  );
});

// Custom tooltip formatter for charts
export const formatChartValue = (value: number, format?: "number" | "percentage" | "currency") => {
  switch (format) {
    case "percentage":
      return `${value.toFixed(1)}%`;
    case "currency":
      return `$${value.toLocaleString()}`;
    default:
      return value.toLocaleString();
  }
};

// Chart gradient definitions for use with Recharts
export const chartGradients = {
  primary: (
    <defs>
      <linearGradient id="gradientPrimary" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.8348 0.1302 160.908)" stopOpacity={0.8} />
        <stop offset="100%" stopColor="oklch(0.8348 0.1302 160.908)" stopOpacity={0.1} />
      </linearGradient>
    </defs>
  ),
  success: (
    <defs>
      <linearGradient id="gradientSuccess" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.7294 0.1686 160.908)" stopOpacity={0.8} />
        <stop offset="100%" stopColor="oklch(0.7294 0.1686 160.908)" stopOpacity={0.1} />
      </linearGradient>
    </defs>
  ),
  warning: (
    <defs>
      <linearGradient id="gradientWarning" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.7765 0.1686 75.734)" stopOpacity={0.8} />
        <stop offset="100%" stopColor="oklch(0.7765 0.1686 75.734)" stopOpacity={0.1} />
      </linearGradient>
    </defs>
  ),
  info: (
    <defs>
      <linearGradient id="gradientInfo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.6588 0.2276 258.338)" stopOpacity={0.8} />
        <stop offset="100%" stopColor="oklch(0.6588 0.2276 258.338)" stopOpacity={0.1} />
      </linearGradient>
    </defs>
  ),
};