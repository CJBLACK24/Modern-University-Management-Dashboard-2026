"use client";

import { EnhancedChart } from "@/components/ui/enhanced-chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Users } from "lucide-react";
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

interface WorkloadData {
  teacherName: string;
  classCount: number;
}

const workloadConfig = {
  classCount: {
    label: "Active Classes",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

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
    <div className="grid gap-8 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <EnhancedChart
          title="Faculty Workload"
          description="Distribution of active classes per faculty member"
          isEmpty={data.length === 0}
          className="border border-border/50 bg-card/40 backdrop-blur-md"
          actions={
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="w-[180px] h-8 text-[10px] font-black uppercase tracking-widest border-border bg-background/50 hover:bg-muted/50 transition-colors">
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
          <div className="h-[400px] w-full pt-6">
            <ChartContainer config={workloadConfig} className="h-full w-full">
              <BarChart
                layout="vertical"
                data={data}
                margin={{ left: 20, right: 40, top: 10, bottom: 10 }}
                barSize={24}
                barGap={12}
              >
                <defs>
                  <linearGradient
                    id="workloadGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="currentColor"
                  className="stroke-muted-foreground/5"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="teacherName"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={150}
                  fontSize={10}
                  fontWeight={800}
                  className="fill-muted-foreground/80 tracking-tight"
                  tickFormatter={(value) =>
                    value.length > 20 ? `${value.substring(0, 17)}...` : value
                  }
                />
                <ChartTooltip
                  cursor={{ fill: "hsl(var(--primary))", opacity: 0.05 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-xl p-4 shadow-2xl animate-in fade-in duration-200 min-w-[160px]">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                              {payload[0].payload.teacherName}
                            </span>
                          </div>
                          <div className="text-2xl font-black text-foreground tabular-nums tracking-tighter">
                            {payload[0].value}
                            <span className="text-xs font-bold text-muted-foreground ml-2">
                              Classes
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="classCount"
                  fill="url(#workloadGradient)"
                  radius={[0, 8, 8, 0]}
                  className="transition-all duration-500 hover:opacity-80"
                />
              </BarChart>
            </ChartContainer>
          </div>
        </EnhancedChart>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 rounded-2xl border-border/50 h-full flex flex-col justify-between group">
          <div className="space-y-8">
            <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black tracking-tight text-foreground">
                Workload Balance
              </h3>
              <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase tracking-wider">
                System-wide resource allocation efficiency
              </p>
            </div>

            <div className="space-y-8 pt-4">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-muted-foreground/60">Utilization</span>
                  <span className="text-primary font-black">78%</span>
                </div>
                <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden p-[2px] border border-primary/5">
                  <div
                    className="h-full bg-primary rounded-full shadow-[0_0_12px_rgba(var(--primary),0.5)]"
                    style={{ width: "78%" }}
                  />
                </div>
                <p className="text-[9px] font-medium text-muted-foreground/50 tracking-wide uppercase">
                  Optimal range: 70% - 85%
                </p>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                    Balance Status
                  </span>
                </div>
                <p className="text-xs font-black text-foreground uppercase tracking-tight">
                  Well Distributed
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full py-3 rounded-xl bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] hover:bg-foreground/90 transition-all shadow-lg active:scale-95">
              Review Allocation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
