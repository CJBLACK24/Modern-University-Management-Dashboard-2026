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
  <div className="flex items-center justify-between flex-wrap gap-4">
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="text-muted-foreground mt-1 text-body">
        Academic Year 2026 - Semester 1 Overview
      </p>
    </div>
    <div className="flex items-center gap-2 flex-wrap">
      <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      <Badge variant="outline" className="px-3 py-1 text-sm touch-target-sm">
        <LayoutDashboard className="w-3 h-3 mr-2" />
        Overview
      </Badge>
    </div>
  </div>
);
