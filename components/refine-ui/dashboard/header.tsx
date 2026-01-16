"use client";

import { LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  TimeRangeSelector,
  TimeRange,
} from "@/components/ui/time-range-selector";

interface DashboardHeaderProps {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

export const DashboardHeader = ({
  timeRange,
  setTimeRange,
}: DashboardHeaderProps) => (
  <div className="flex items-center justify-between flex-wrap gap-6 pb-2 border-b border-border/10">
    <div className="space-y-1.5">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg animate-float">
          <LayoutDashboard className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gradient-premium">
          Dashboard
        </h1>
      </div>
      <p className="text-muted-foreground flex items-center gap-2 text-sm font-medium pl-11">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Academic Year 2026 • Semester 1 Overview
      </p>
    </div>
    <div className="flex items-center gap-3 flex-wrap">
      <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      <Badge
        variant="secondary"
        className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-primary/5 border-primary/20 text-primary shadow-sm hover:bg-primary/10 transition-colors cursor-default"
      >
        Live Updates
      </Badge>
    </div>
  </div>
);
