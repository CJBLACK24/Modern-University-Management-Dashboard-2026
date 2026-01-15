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

interface GradeData {
  range: string;
  count: number;
}

export const GradeDistribution = () => {
  const [data, setData] = useState<GradeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics/grade-distribution");
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
      title="Grade Distribution"
      description="Overview of student performance grades"
      isEmpty={data.length === 0}
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
            cursor={{ fill: "oklch(0.8348 0.1302 160.908 / 0.1)" }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid oklch(0.8978 0.0172 258.338)",
              backgroundColor: "oklch(0.9911 0 0 / 0.95)",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              backdropFilter: "blur(4px)",
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
