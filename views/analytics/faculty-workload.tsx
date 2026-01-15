"use client";

import { EnhancedChart } from "@/components/ui/enhanced-chart";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

interface WorkloadData {
  teacherName: string;
  classCount: number;
}

export const FacultyWorkload = () => {
  const { departments } = useDashboardData();
  const [data, setData] = useState<WorkloadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>("all");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedDept !== "all")
          queryParams.append("departmentId", selectedDept);

        const res = await fetch(
          `/api/analytics/faculty-workload?${queryParams.toString()}`
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
  }, [selectedDept]);

  if (loading) return <Skeleton className="h-[300px] w-full rounded-xl" />;

  return (
    <EnhancedChart
      title="Top Faculty Workload"
      description="Teachers with the most active classes"
      isEmpty={data.length === 0}
      actions={
        <Select value={selectedDept} onValueChange={setSelectedDept}>
          <SelectTrigger className="w-[180px] h-8 text-xs font-bold border-border bg-background hover:bg-muted/50 transition-colors">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent className="border-border bg-popover">
            <SelectItem value="all" className="text-xs font-bold">
              All Departments
            </SelectItem>
            {departments.map((dept) => (
              <SelectItem
                key={dept.id}
                value={dept.id.toString()}
                className="text-xs font-bold"
              >
                {dept.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ left: 60, right: 30, top: 10, bottom: 10 }}
        >
          {chartGradients.primary}
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            opacity={0.1}
          />
          <XAxis type="number" hide />
          <YAxis
            dataKey="teacherName"
            type="category"
            tickLine={false}
            axisLine={false}
            width={150}
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
          <Bar
            dataKey="classCount"
            fill="oklch(0.8348 0.1302 160.908)"
            radius={[0, 6, 6, 0]}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </EnhancedChart>
  );
};
