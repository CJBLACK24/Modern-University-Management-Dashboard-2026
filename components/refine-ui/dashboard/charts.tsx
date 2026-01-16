"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import { EnhancedChart } from "@/components/ui/enhanced-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  YearLevel,
  Semester,
  DemographicData,
} from "@/hooks/use-dashboard-data";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip, // Changed from ChartTooltip as ChartTooltipShadcn
  ChartLegend,
} from "@/components/ui/chart";

import type { Department as DepartmentType } from "@/types";
import { GraduationCap, LayoutGrid, Users } from "lucide-react"; // Added Users, GraduationCap, LayoutGrid imports

interface ChartDepartmentData {
  departmentName: string;
  totalSubjects: number;
}

// Tooltip for the Subject Distribution chart
const ChartTooltipContent = ({
  // Renamed to ChartTooltipContent to avoid conflict with imported ChartTooltip
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    fill: string;
    payload: ChartDepartmentData;
  }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const name = data.departmentName || label;

    return (
      <div className="rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-xl p-4 shadow-2xl ring-1 ring-primary/10 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">
            {name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="h-10 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            style={{ backgroundColor: payload[0].fill }}
          />
          <div>
            <span className="block text-2xl font-black text-foreground tabular-nums tracking-tighter">
              {payload[0].value.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Total Subjects
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const GenderTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    fill?: string;
    color?: string;
    [key: string]: string | number | undefined;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-xl p-4 shadow-2xl ring-1 ring-primary/10 animate-in fade-in zoom-in duration-300 min-w-[160px]">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">
            {label}
          </p>
        </div>
        <div className="space-y-3">
          {payload.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-6"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                  style={{
                    backgroundColor: entry.fill?.includes("url")
                      ? "hsl(var(--primary))"
                      : entry.fill || entry.color || "hsl(var(--primary))",
                  }}
                />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  {entry.name}
                </span>
              </div>
              <span className="text-sm font-black text-foreground tabular-nums">
                {(entry.value ?? 0).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

interface DistributionChartProps {
  getSubjectsByDepartment: (
    year: YearLevel,
    semester: Semester
  ) => ChartDepartmentData[];
}

const distributionConfig = {
  totalSubjects: {
    label: "Total Subjects",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export const DistributionChart = ({
  getSubjectsByDepartment,
}: DistributionChartProps) => {
  const [selectedYear, setSelectedYear] = useState<YearLevel>("all");
  const [selectedSemester, setSelectedSemester] = useState<Semester>("all");
  const data = getSubjectsByDepartment(selectedYear, selectedSemester);

  return (
    <EnhancedChart
      title="Department Performance"
      description="Subject distribution and workload efficiency"
      className="col-span-full border border-border bg-card shadow-sm"
      isEmpty={data.length === 0}
      actions={
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Select
            value={selectedYear}
            onValueChange={(v) => setSelectedYear(v as YearLevel)}
          >
            <SelectTrigger className="w-full sm:w-[120px] h-9 sm:h-8 text-xs font-bold border-border bg-background hover:bg-muted/50 transition-colors">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="all" className="text-xs font-bold">
                All Years
              </SelectItem>
              {[1, 2, 3, 4].map((y) => (
                <SelectItem
                  key={y}
                  value={y.toString()}
                  className="text-xs font-bold"
                >
                  {y}
                  {y === 1 ? "st" : y === 2 ? "nd" : y === 3 ? "rd" : "th"} Year
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedSemester}
            onValueChange={(v) => setSelectedSemester(v as Semester)}
          >
            <SelectTrigger className="w-full sm:w-[120px] h-9 sm:h-8 text-xs font-bold border-border bg-background hover:bg-muted/50 transition-colors">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="all" className="text-xs font-bold">
                All Semesters
              </SelectItem>
              <SelectItem value="1" className="text-xs font-bold">
                1st Semester
              </SelectItem>
              <SelectItem value="2" className="text-xs font-bold">
                2nd Semester
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
    >
      <div className="h-[350px] w-full pt-4">
        <ChartContainer config={distributionConfig} className="h-full w-full">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorSubjects" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-totalSubjects)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="50%"
                  stopColor="var(--color-totalSubjects)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-totalSubjects)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              className="stroke-muted-foreground/10"
            />
            <XAxis
              dataKey="departmentName"
              className="fill-muted-foreground"
              fontSize={10}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              interval={0}
              tick={(props: {
                x: number;
                y: number;
                payload: { value: string };
              }) => {
                const { x, y, payload } = props;
                const label =
                  payload.value.length > 8
                    ? `${payload.value.substring(0, 8)}...`
                    : payload.value;
                return (
                  <text
                    x={x}
                    y={y}
                    dy={16}
                    textAnchor="middle"
                    fill="currentColor"
                    className="text-[9px] fill-muted-foreground/60 font-bold"
                  >
                    {label}
                  </text>
                );
              }}
            />
            <YAxis
              className="fill-muted-foreground"
              fontSize={10}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={{
                stroke: "hsl(var(--muted-foreground))",
                strokeOpacity: 0.1,
              }}
              content={<ChartTooltipContent />} // Used ChartTooltipContent here
            />
            <Area
              type="monotone"
              dataKey="totalSubjects"
              stroke="var(--color-totalSubjects)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSubjects)"
              animationDuration={1500}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </EnhancedChart>
  );
};

// Demographics Chart - Students and Faculty Gender Breakdown
interface DemographicsChartProps {
  getDemographicsByYear: (
    year: YearLevel,
    departmentId: string | "all"
  ) => DemographicData;
  departments: DepartmentType[];
}

const demographicsConfig = {
  value: {
    label: "Count",
  },
  Male: {
    label: "Male",
    color: "hsl(var(--chart-3))",
  },
  Female: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const DemographicsChart = ({
  getDemographicsByYear,
  departments,
}: DemographicsChartProps) => {
  const [selectedYear, setSelectedYear] = useState<YearLevel>("all");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"students" | "faculty">("students");
  const data = getDemographicsByYear(selectedYear, selectedDept);

  const activeData = viewMode === "students" ? data.students : data.faculty;

  const chartData = [
    {
      gender: "Male",
      value: activeData.male,
      fill: "url(#gradeMale)",
    },
    {
      gender: "Female",
      value: activeData.female,
      fill: "url(#gradeFemale)",
    },
  ];

  return (
    <EnhancedChart
      title="User Demographics"
      description="Gender distribution among students and faculty"
      className="col-span-full border border-border bg-card shadow-sm"
      isEmpty={data.students.total === 0 && data.faculty.total === 0}
      actions={
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Select
            value={viewMode}
            onValueChange={(v) => setViewMode(v as "students" | "faculty")}
          >
            <SelectTrigger className="w-full sm:w-[130px] h-9 sm:h-8 text-xs font-bold border-border bg-background hover:bg-muted/50 transition-colors">
              <SelectValue placeholder="View Mode" />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="students" className="text-xs font-bold">
                Students
              </SelectItem>
              <SelectItem value="faculty" className="text-xs font-bold">
                Faculty
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDept} onValueChange={setSelectedDept}>
            <SelectTrigger className="w-full sm:w-[180px] h-9 sm:h-8 text-xs font-bold border-border bg-background hover:bg-muted/50 transition-colors">
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
                  {dept.code} - {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedYear}
            onValueChange={(v) => setSelectedYear(v as YearLevel)}
          >
            <SelectTrigger className="w-full sm:w-[120px] h-9 sm:h-8 text-xs font-bold border-border bg-background hover:bg-muted/50 transition-colors">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="all" className="text-xs font-bold">
                All Years
              </SelectItem>
              {[1, 2, 3, 4].map((y) => (
                <SelectItem
                  key={y}
                  value={y.toString()}
                  className="text-xs font-bold"
                >
                  {y}
                  {y === 1 ? "st" : y === 2 ? "nd" : y === 3 ? "rd" : "th"} Year
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    >
      <div className="grid md:grid-cols-2 gap-10 pt-4">
        {/* Students Section */}
        <div className="space-y-6 bg-muted/5 p-6 rounded-2xl border border-border/50 hover:bg-muted/10 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                  Total Students
                </h4>
                <p className="text-3xl font-black text-foreground tabular-nums tracking-tighter">
                  {data.students.total.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-[9px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </div>
          </div>

          {/* Section Breakdown Mini List */}
          <div className="mt-4 pt-6 border-t border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid className="h-4 w-4 text-muted-foreground/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                Section Breakdown
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["A", "B", "C"].map((sec) => (
                <div
                  key={sec}
                  className="bg-background/80 border border-border/50 rounded-xl p-3 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-[9px] font-black text-muted-foreground/40 mb-1 tracking-widest uppercase">
                    SEC {sec}
                  </div>
                  <div className="text-lg font-black text-foreground tabular-nums tracking-tight">
                    {data.students.sections[
                      sec as keyof typeof data.students.sections
                    ].toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Faculty Section */}
        <div className="space-y-6 bg-indigo-500/5 p-6 rounded-2xl border border-indigo-500/10 hover:bg-indigo-500/10 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                <Users className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                  Total Faculty
                </h4>
                <p className="text-3xl font-black text-foreground tabular-nums tracking-tighter">
                  {data.faculty.total.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="px-2 py-1 rounded-md bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 text-[9px] font-bold uppercase tracking-wider">
              Verified
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-indigo-500/10">
            <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">
              <span>Engagement Index</span>
              <span className="text-indigo-400 font-black">85%</span>
            </div>
            <div className="w-full h-2 bg-indigo-500/10 rounded-full overflow-hidden border border-indigo-500/5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-primary w-[85%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)] anim-grow-width"
                style={{ "--target-width": "85%" } as React.CSSProperties}
              />
            </div>
            <p className="text-[10px] font-medium text-muted-foreground/50 italic">
              * Faculty engagement is tracked via attendance and system
              activity.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="h-[300px] w-full mt-8">
        <ChartContainer config={demographicsConfig} className="h-full w-full">
          <BarChart
            data={chartData}
            barGap={0}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="gradeMale" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.3}
                />
              </linearGradient>
              <linearGradient id="gradeFemale" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={0.3}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              className="stroke-muted-foreground/10"
            />
            <XAxis
              dataKey="gender"
              className="fill-muted-foreground font-bold"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickMargin={12}
            />
            <YAxis
              className="fill-muted-foreground font-bold"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--foreground))", fillOpacity: 0.03 }}
              content={<GenderTooltip />}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={60}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
            <ChartLegend
              content={() => (
                <div className="flex items-center justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-linear-to-b from-[hsl(var(--chart-3))] to-[hsl(var(--chart-3)/0.3)]" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Male
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-linear-to-b from-[hsl(var(--chart-2))] to-[hsl(var(--chart-2)/0.3)]" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Female
                    </span>
                  </div>
                </div>
              )}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </EnhancedChart>
  );
};
