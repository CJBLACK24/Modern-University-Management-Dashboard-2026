"use client";

import { EnhancedChart } from "@/components/ui/enhanced-chart";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { chartGradients } from "@/components/ui/enhanced-chart";

interface TrendData {
  year: string;
  count: number;
}

export const EnrollmentTrends = () => {
  const [data, setData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics/enrollment-trends");
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
      title="Enrollment by Year Level"
      description="Current distribution of students across year levels"
      isEmpty={data.length === 0}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {chartGradients.primary}
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="oklch(0.5765 0.0147 258.338)"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            fontSize={12}
            stroke="oklch(0.5765 0.0147 258.338)"
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid oklch(0.8978 0.0172 258.338)",
              backgroundColor: "oklch(0.9911 0 0 / 0.95)",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              backdropFilter: "blur(4px)",
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="oklch(0.8348 0.1302 160.908)"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "oklch(0.8348 0.1302 160.908)",
              strokeWidth: 2,
              stroke: "oklch(0.9911 0 0)",
            }}
            activeDot={{ r: 8, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </EnhancedChart>
  );
};
