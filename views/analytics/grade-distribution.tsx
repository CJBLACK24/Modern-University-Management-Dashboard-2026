"use client";

import { EnhancedChart } from "@/components/ui/enhanced-chart";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
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

interface GradeData {
  range: string;
  count: number;
}

const gradeConfig = {
  count: {
    label: "Students",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

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
    <div className="grid gap-8 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <EnhancedChart
          title="Grade Performance"
          description="Distribution of final student grades"
          isEmpty={data.length === 0}
          className="border border-border/50 bg-card/40 backdrop-blur-md"
          actions={
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* Department Filter */}
              <Select value={selectedDept} onValueChange={setSelectedDept}>
                <SelectTrigger className="w-full sm:w-[120px] h-8 text-[10px] font-black uppercase tracking-widest border-border bg-background/50 hover:bg-muted/50 transition-colors">
                  <SelectValue placeholder="All Depts" />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover">
                  <SelectItem value="all" className="text-xs font-bold">
                    All Depts
                  </SelectItem>
                  {departments.map((d) => (
                    <SelectItem
                      key={d.id}
                      value={d.id.toString()}
                      className="text-xs font-bold"
                    >
                      {d.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2 w-full sm:w-auto">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="flex-1 sm:w-[100px] h-8 text-[10px] font-black uppercase tracking-widest border-border bg-background/50 hover:bg-muted/50 transition-colors">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="all" className="text-xs font-bold">
                      All Years
                    </SelectItem>
                    <SelectItem value="1" className="text-xs font-bold">
                      1st Year
                    </SelectItem>
                    <SelectItem value="2" className="text-xs font-bold">
                      2nd Year
                    </SelectItem>
                    <SelectItem value="3" className="text-xs font-bold">
                      3rd Year
                    </SelectItem>
                    <SelectItem value="4" className="text-xs font-bold">
                      4th Year
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedSem} onValueChange={setSelectedSem}>
                  <SelectTrigger className="flex-1 sm:w-[100px] h-8 text-[10px] font-black uppercase tracking-widest border-border bg-background/50 hover:bg-muted/50 transition-colors">
                    <SelectValue placeholder="All Sems" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover">
                    <SelectItem value="all" className="text-xs font-bold">
                      All Sems
                    </SelectItem>
                    <SelectItem value="1" className="text-xs font-bold">
                      1st Sem
                    </SelectItem>
                    <SelectItem value="2" className="text-xs font-bold">
                      2nd Sem
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          }
        >
          <div className="h-[350px] w-full pt-6">
            <ChartContainer config={gradeConfig} className="h-full w-full">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                barGap={8}
              >
                <defs>
                  <linearGradient id="gradePass" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.4}
                    />
                  </linearGradient>
                  <linearGradient id="gradeFail" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--destructive))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--destructive))"
                      stopOpacity={0.4}
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
                  dataKey="range"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={15}
                  fontSize={10}
                  fontWeight={800}
                  className="fill-muted-foreground/60 tracking-widest uppercase"
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
                  cursor={{ fill: "hsl(var(--primary))", opacity: 0.05 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const val = parseFloat(payload[0].payload.range);
                      const isPassing = val < 4.0;
                      return (
                        <div className="rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-xl p-4 shadow-2xl animate-in zoom-in-95 duration-200 min-w-[140px]">
                          <div className="flex items-center gap-2 mb-3">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                isPassing ? "bg-emerald-500" : "bg-destructive"
                              } animate-pulse`}
                            />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                              Grade: {payload[0].payload.range}
                            </span>
                          </div>
                          <div className="text-2xl font-black text-foreground tabular-nums tracking-tighter">
                            {payload[0].value?.toLocaleString()}
                            <span className="text-xs font-bold text-muted-foreground ml-2">
                              Students
                            </span>
                          </div>
                          <div
                            className={`mt-2 text-[9px] font-black uppercase tracking-wider ${
                              isPassing
                                ? "text-emerald-500/70"
                                : "text-destructive/70"
                            }`}
                          >
                            {isPassing
                              ? "Passing Status: Excellent"
                              : "Passing Status: Critical"}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                  {data.map((entry, index) => {
                    const gradeVal = parseFloat(entry.range);
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          gradeVal >= 4.0
                            ? "url(#gradeFail)"
                            : "url(#gradePass)"
                        }
                        className="transition-all duration-500 hover:opacity-80"
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </EnhancedChart>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 rounded-2xl border-border/50 h-full flex flex-col justify-between group">
          <div className="space-y-6">
            <div className="p-3 bg-emerald-500/10 rounded-xl w-fit group-hover:scale-110 transition-transform duration-500">
              <div className="h-6 w-6 text-emerald-500 flex items-center justify-center font-black text-xs">
                %
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black tracking-tight text-foreground">
                Passing Metrics
              </h3>
              <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase tracking-wider">
                Overall success rate across departments
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                  <span>Passing</span>
                  <span className="text-emerald-500">84%</span>
                </div>
                <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[84%] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                  <span>Incomplete</span>
                  <span className="text-amber-500">12%</span>
                </div>
                <div className="h-1.5 w-full bg-amber-500/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[12%] shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                  <span>Failed</span>
                  <span className="text-destructive">4%</span>
                </div>
                <div className="h-1.5 w-full bg-destructive/10 rounded-full overflow-hidden">
                  <div className="h-full bg-destructive w-[4%] shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-background/50 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                Performance Note
              </span>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground/60 leading-relaxed">
              Standard deviation in grades has decreased by 12% compared to last
              semester.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
