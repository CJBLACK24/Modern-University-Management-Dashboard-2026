"use client";

import { EnhancedChart } from "@/components/ui/enhanced-chart";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { chartGradients } from "@/components/ui/enhanced-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashboardData } from "@/hooks/use-dashboard-data";

interface GradeData {
  range: string;
  count: number;
}

export const GradeDistribution = () => {
  const { departments } = useDashboardData();
  const [data, setData] = useState<GradeData[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSem, setSelectedSem] = useState<string>("all");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedDept !== "all")
          queryParams.append("departmentId", selectedDept);
        if (selectedYear !== "all")
          queryParams.append("yearLevel", selectedYear);
        if (selectedSem !== "all") queryParams.append("semester", selectedSem);

        const res = await fetch(
          `/api/analytics/grade-distribution?${queryParams.toString()}`
        );
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedDept, selectedYear, selectedSem]);

  if (loading) return <Skeleton className="h-[300px] w-full rounded-xl" />;

  return (
    <EnhancedChart
      title="Grade Distribution"
      description="Overview of student performance grades"
      isEmpty={data.length === 0}
      actions={
        <div className="flex gap-2">
          {/* Department Filter */}
          <Select value={selectedDept} onValueChange={setSelectedDept}>
            <SelectTrigger className="w-[140px] h-8 text-xs font-bold border-border bg-background hover:bg-muted/50">
              <SelectValue placeholder="All Depts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Depts</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d.id} value={d.id.toString()}>
                  {d.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year Filter */}
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px] h-8 text-xs font-bold border-border bg-background hover:bg-muted/50">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="1">1st Year</SelectItem>
              <SelectItem value="2">2nd Year</SelectItem>
              <SelectItem value="3">3rd Year</SelectItem>
              <SelectItem value="4">4th Year</SelectItem>
            </SelectContent>
          </Select>

          {/* Semester Filter */}
          <Select value={selectedSem} onValueChange={setSelectedSem}>
            <SelectTrigger className="w-[100px] h-8 text-xs font-bold border-border bg-background hover:bg-muted/50">
              <SelectValue placeholder="All Sems" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sems</SelectItem>
              <SelectItem value="1">1st Sem</SelectItem>
              <SelectItem value="2">2nd Sem</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          {chartGradients.primary}
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
          <XAxis
            dataKey="range"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="oklch(0.5765 0.0147 258.338)"
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="oklch(0.5765 0.0147 258.338)"
          />
          <Tooltip
            cursor={{ fill: "oklch(0.25 0.05 250 / 0.1)" }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid oklch(0.25 0.05 250 / 0.5)",
              backgroundColor: "oklch(0.15 0.02 250 / 0.8)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)",
            }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
            {data.map((entry, index) => {
              const gradeVal = parseFloat(entry.range);
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    gradeVal >= 4.0
                      ? "oklch(0.5765 0.2276 29.234)" // Destructive red for fail
                      : "oklch(0.8348 0.1302 160.908)" // Primary for pass
                  }
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </EnhancedChart>
  );
};
