"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
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
import { Users, GraduationCap, LayoutGrid } from "lucide-react";

import type { Department as DepartmentType } from "@/types";

interface ChartDepartmentData {
  departmentName: string;
  totalSubjects: number;
}

// Tooltip for the Subject Distribution chart
const ChartTooltip = ({
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
      <div className="rounded-xl border border-border bg-popover p-3 shadow-xl ring-1 ring-border">
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
          {name}
        </p>
        <div className="flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]"
            style={{ backgroundColor: payload[0].fill }}
          />
          <span className="text-lg font-black text-foreground tabular-nums">
            {payload[0].value.toLocaleString()} subjects
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// Tooltip for the Gender/Demographics chart - defined outside component to avoid recreation
const GenderTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; fill: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-popover p-3 shadow-xl ring-1 ring-border">
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
          {label}
        </p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-xs font-bold text-muted-foreground">
                {entry.name}:
              </span>
              <span className="text-sm font-black text-foreground tabular-nums">
                {entry.value.toLocaleString()}
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

export const DistributionChart = ({
  getSubjectsByDepartment,
}: DistributionChartProps) => {
  const [selectedYear, setSelectedYear] = useState<YearLevel>("all");
  const [selectedSemester, setSelectedSemester] = useState<Semester>("all");
  const data = getSubjectsByDepartment(selectedYear, selectedSemester);

  return (
    <EnhancedChart
      title="Subject Distribution by Department"
      className="col-span-full border border-border bg-card shadow-sm"
      isEmpty={data.length === 0}
      actions={
        <div className="flex items-center gap-3">
          <Select
            value={selectedYear}
            onValueChange={(v) => setSelectedYear(v as YearLevel)}
          >
            <SelectTrigger className="w-[120px] h-8 text-xs font-bold border-border bg-background hover:bg-muted/50 transition-colors">
              <SelectValue placeholder="Year" />
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

          <Select
            value={selectedSemester}
            onValueChange={(v) => setSelectedSemester(v as Semester)}
          >
            <SelectTrigger className="w-[120px] h-8 text-xs font-bold border-border bg-background hover:bg-muted/50 transition-colors">
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
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
          >
            <defs>
              <linearGradient id="colorSubjects" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="oklch(0.705 0.213 146.75)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="oklch(0.705 0.213 146.75)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="white"
              opacity={0.05}
            />
            <XAxis
              dataKey="departmentName"
              stroke="white"
              opacity={0.4}
              fontSize={10}
              fontWeight={700}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-35}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="white"
              opacity={0.4}
              fontSize={10}
              fontWeight={700}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="totalSubjects"
              stroke="oklch(0.705 0.213 146.75)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSubjects)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
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

export const DemographicsChart = ({
  getDemographicsByYear,
  departments,
}: DemographicsChartProps) => {
  const [selectedYear, setSelectedYear] = useState<YearLevel>("all");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const data = getDemographicsByYear(selectedYear, selectedDept);

  const chartData = [
    {
      name: "Students",
      Male: data.students.male,
      Female: data.students.female,
      total: data.students.total,
    },
    {
      name: "Faculty",
      Male: data.faculty.male,
      Female: data.faculty.female,
      total: data.faculty.total,
    },
  ];

  return (
    <EnhancedChart
      title="User Demographics"
      className="col-span-full border border-border bg-card shadow-sm"
      isEmpty={data.students.total === 0 && data.faculty.total === 0}
      actions={
        <div className="flex items-center gap-3">
          <Select value={selectedDept} onValueChange={setSelectedDept}>
            <SelectTrigger className="w-[180px] h-8 text-xs font-bold border-border bg-background hover:bg-muted/50 transition-colors">
              <SelectValue placeholder="Select Department" />
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
            <SelectTrigger className="w-[140px] h-8 text-xs font-bold border-border bg-background hover:bg-muted/50 transition-colors">
              <SelectValue placeholder="Select Year" />
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
        </div>
      }
    >
      <div className="grid md:grid-cols-2 gap-8 pt-4">
        {/* Students Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-linear-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20">
              <GraduationCap className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground/80">
                Students
              </h4>
              <p className="text-2xl font-black text-foreground tabular-nums">
                {data.students.total.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Male
                </span>
              </div>
              <span className="text-sm font-black text-foreground tabular-nums">
                {data.students.male.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Female
                </span>
              </div>
              <span className="text-sm font-black text-foreground tabular-nums">
                {data.students.female.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Section Breakdown Mini List */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground/60" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                Section Distribution
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["A", "B", "C"].map((sec) => (
                <div
                  key={sec}
                  className="bg-muted/20 border border-border rounded-lg p-2 text-center"
                >
                  <div className="text-[10px] font-bold text-muted-foreground/60 mb-1">
                    SEC {sec}
                  </div>
                  <div className="text-sm font-black text-foreground">
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
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-linear-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/20">
              <Users className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground/80">
                Faculty
              </h4>
              <p className="text-2xl font-black text-foreground tabular-nums">
                {data.faculty.total.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Male
                </span>
              </div>
              <span className="text-sm font-black text-foreground tabular-nums">
                {data.faculty.male.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Female
                </span>
              </div>
              <span className="text-sm font-black text-foreground tabular-nums">
                {data.faculty.female.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="h-[200px] w-full mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={8}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="white"
              opacity={0.05}
            />
            <XAxis
              dataKey="name"
              stroke="white"
              opacity={0.4}
              fontSize={11}
              fontWeight={700}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="white"
              opacity={0.4}
              fontSize={10}
              fontWeight={700}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<GenderTooltip />} />
            <Bar
              dataKey="Male"
              fill="oklch(0.627 0.17 250)"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
            <Bar
              dataKey="Female"
              fill="oklch(0.7 0.2 350)"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[oklch(0.627_0.17_250)]" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Male
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[oklch(0.7_0.2_350)]" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Female
          </span>
        </div>
      </div>
    </EnhancedChart>
  );
};
