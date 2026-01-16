"use client";

import { EnhancedChart } from "@/components/ui/enhanced-chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Users } from "lucide-react";

interface TrendData {
  year: string;
  count: number;
}

const enrollmentConfig = {
  count: {
    label: "Enrolled",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export const EnrollmentTrends = () => {
  const { departments } = useDashboardData();
  const [data, setData] = useState<TrendData[]>([]);
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
          `/api/analytics/enrollment-trends?${queryParams.toString()}`
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
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <EnhancedChart
          title="Enrollment Dynamics"
          description="Student growth across different year levels"
          isEmpty={data.length === 0}
          className="border border-border/50 bg-card/40 backdrop-blur-md"
          actions={
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Select value={selectedDept} onValueChange={setSelectedDept}>
                <SelectTrigger className="w-full sm:w-[180px] h-8 text-[10px] font-black uppercase tracking-widest border-border bg-background/50 hover:bg-muted/50 transition-colors">
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
            </div>
          }
        >
          <div className="h-[350px] w-full pt-6">
            <ChartContainer config={enrollmentConfig} className="h-full w-full">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="50%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={1}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="currentColor"
                  className="stroke-muted-foreground/5"
                />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={15}
                  fontSize={10}
                  fontWeight={800}
                  className="fill-muted-foreground/60 uppercase tracking-widest"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  fontSize={10}
                  fontWeight={800}
                  className="fill-muted-foreground/60"
                />
                <ChartTooltip
                  cursor={{
                    stroke: "hsl(var(--primary))",
                    strokeWidth: 2,
                    strokeDasharray: "5 5",
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-xl p-4 shadow-2xl animate-in zoom-in-95 duration-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                              {payload[0].payload.year}
                            </span>
                          </div>
                          <div className="text-2xl font-black text-foreground tabular-nums tracking-tighter">
                            {payload[0].value?.toLocaleString()}
                            <span className="text-xs font-bold text-muted-foreground ml-2">
                              Students
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="url(#lineGradient)"
                  strokeWidth={4}
                  dot={{
                    r: 6,
                    fill: "hsl(var(--background))",
                    strokeWidth: 3,
                    stroke: "hsl(var(--primary))",
                  }}
                  activeDot={{
                    r: 8,
                    fill: "hsl(var(--primary))",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 4,
                  }}
                  animationDuration={2000}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </EnhancedChart>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 rounded-2xl border-border/50 h-full flex flex-col justify-between">
          <div className="space-y-6">
            <div className="p-3 bg-primary/10 rounded-xl w-fit animate-float">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black tracking-tight text-foreground">
                Enrollment Insights
              </h3>
              <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase tracking-wider">
                Key performance metrics for the current period
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50 group/row hover:bg-primary/5 transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-primary transition-colors">
                  Growth Rate
                </span>
                <span className="text-sm font-black text-emerald-500">
                  +8.4%
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50 group/row hover:bg-indigo-500/5 transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-indigo-400 transition-colors">
                  Retention
                </span>
                <span className="text-sm font-black text-indigo-400">92%</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50 group/row hover:bg-amber-500/5 transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover/row:text-amber-500 transition-colors">
                  Diversity
                </span>
                <span className="text-sm font-black text-amber-500">
                  Global
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-[11px] font-bold text-primary/80 italic leading-relaxed">
              &quot;Student enrollment is at an all-time high in the Engineering
              department.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
