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

interface WorkloadData {
  teacherName: string;
  classCount: number;
}

export const FacultyWorkload = () => {
  const [data, setData] = useState<WorkloadData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics/faculty-workload");
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
  }, []);

  if (loading) return <Skeleton className="h-[300px] w-full rounded-xl" />;

  return (
    <EnhancedChart
      title="Top Faculty Workload"
      description="Teachers with the most active classes"
      isEmpty={data.length === 0}
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
            cursor={{ fill: "oklch(0.8348 0.1302 160.908 / 0.1)" }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid oklch(0.8978 0.0172 258.338)",
              backgroundColor: "oklch(0.9911 0 0 / 0.95)",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              backdropFilter: "blur(4px)",
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
