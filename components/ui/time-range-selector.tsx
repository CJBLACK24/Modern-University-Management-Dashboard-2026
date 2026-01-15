"use client";

import { Calendar } from "lucide-react";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";

export type TimeRange = "7d" | "30d" | "90d" | "1y" | "all";

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  className?: string;
}

const timeRangeOptions = [
  { value: "7d" as TimeRange, label: "Last 7 days" },
  { value: "30d" as TimeRange, label: "Last 30 days" },
  { value: "90d" as TimeRange, label: "Last 90 days" },
  { value: "1y" as TimeRange, label: "Last year" },
  { value: "all" as TimeRange, label: "All time" },
];

export function TimeRangeSelector({
  value,
  onChange,
  className,
}: TimeRangeSelectorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[160px] h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {timeRangeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface TimeRangeButtonsProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  className?: string;
}

export function TimeRangeButtons({
  value,
  onChange,
  className,
}: TimeRangeButtonsProps) {
  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {timeRangeOptions.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(option.value)}
          className="touch-target-sm"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}