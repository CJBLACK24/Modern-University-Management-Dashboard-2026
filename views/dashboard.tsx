/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { useList } from "@refinedev/core";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BookOpen,
  Building2,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  Users,
} from "lucide-react";

import { EnrollmentTrends } from "@/views/analytics/enrollment-trends";
import { GradeDistribution } from "@/views/analytics/grade-distribution";
import { FacultyWorkload } from "@/views/analytics/faculty-workload";
import { AttendanceReport } from "@/views/analytics/attendance-report";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EnhancedProgress } from "@/components/ui/enhanced-progress";
import {
  TimeRangeSelector,
  TimeRange,
} from "@/components/ui/time-range-selector";
import { EnhancedChart, chartGradients } from "@/components/ui/enhanced-chart";
import type { Department, Subject, User } from "@/types";

type ClassListItem = {
  id: number;
  name: string;
  createdAt?: string;
  subject?: {
    name: string;
  };
  teacher?: {
    name: string;
  };
};

const roleColors = ["#f97316", "#0ea5e9", "#22c55e", "#a855f7"];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-background/95 p-3 shadow-xl backdrop-blur-sm">
        <p className="mb-1 text-sm font-bold text-foreground">{label}</p>
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: payload[0].fill }}
          />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {payload[0].name.replace(/([A-Z])/g, " $1").trim()}:
          </span>
          <span className="text-sm font-bold text-foreground">
            {payload[0].value}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [activeTab, setActiveTab] = useState("overview");
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  const { query: usersQuery } = useList<User>({
    resource: "users",
    pagination: { mode: "off" },
    liveMode: "auto",
  });

  const { query: subjectsQuery } = useList<Subject>({
    resource: "subjects",
    pagination: { mode: "off" },
    liveMode: "auto",
  });

  const { query: departmentsQuery } = useList<Department>({
    resource: "departments",
    pagination: { mode: "off" },
    liveMode: "auto",
  });

  const { query: classesQuery } = useList<ClassListItem>({
    resource: "classes",
    pagination: { mode: "off" },
    liveMode: "auto",
  });

  const usersData = usersQuery.data?.data;
  const subjectsData = subjectsQuery.data?.data;
  const departmentsData = departmentsQuery.data?.data;
  const classesData = classesQuery.data?.data;

  const users = useMemo(() => usersData ?? [], [usersData]);
  const subjects = useMemo(() => subjectsData ?? [], [subjectsData]);
  const departments = useMemo(() => departmentsData ?? [], [departmentsData]);
  const classes = useMemo(() => classesData ?? [], [classesData]);

  const usersByRole = useMemo(() => {
    const counts = users.reduce<Record<string, number>>((acc, user) => {
      const role = user.role ?? "unknown";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([role, total]) => ({ role, total }));
  }, [users]);

  const subjectsByDepartment = useMemo(() => {
    const counts = subjects.reduce<Record<string, number>>((acc, subject) => {
      const departmentName =
        (subject as { department?: { name?: string } }).department?.name ??
        "Unassigned";
      acc[departmentName] = (acc[departmentName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([departmentName, totalSubjects]) => ({
      departmentName,
      totalSubjects,
    }));
  }, [subjects]);

  const newestClasses = useMemo(() => {
    return [...classes]
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);
  }, [classes]);

  const newestTeachers = useMemo(() => {
    return users
      .filter((user) => user.role === "teacher")
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);
  }, [users]);

  const topDepartments = useMemo(() => {
    return [...subjectsByDepartment]
      .sort((a, b) => b.totalSubjects - a.totalSubjects)
      .slice(0, 5)
      .map((dept) => ({
        ...dept,
        id: departments.find((d) => d.name === dept.departmentName)?.id,
      }));
  }, [subjectsByDepartment, departments]);

  const stats = [
    {
      label: "Total Students",
      value: users.filter((u) => u.role === "student").length,
      icon: Users,
      trend: "+12% vs last sem",
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20",
      progress: 75,
    },
    {
      label: "Active Faculty",
      value: users.filter((u) => u.role === "teacher").length,
      icon: GraduationCap,
      trend: "Stable",
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20",
      progress: 92,
    },
    {
      label: "Total Classes",
      value: classes.length,
      icon: Calendar,
      trend: "+5 new this week",
      color: "text-violet-600 bg-violet-100 dark:bg-violet-900/20",
      progress: 68,
    },
    {
      label: "Subjects Offered",
      value: subjects.length,
      icon: BookOpen,
      trend: "Across " + departments.length + " depts",
      color: "text-amber-600 bg-amber-100 dark:bg-amber-900/20",
      progress: 85,
    },
  ];

  const handleLegendClick = (dataKey: string) => {
    setHiddenSeries((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dataKey)) {
        newSet.delete(dataKey);
      } else {
        newSet.add(dataKey);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-8 p-1">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-body">
            Academic Year 2026 - Semester 1 Overview
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
          <Badge
            variant="outline"
            className="px-3 py-1 text-sm touch-target-sm"
          >
            <LayoutDashboard className="w-3 h-3 mr-2" />
            Overview
          </Badge>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview" className="touch-target-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="touch-target-sm">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="touch-target-sm">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Hero Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="border-none shadow-sm hover:shadow-md transition-all duration-200 bg-gradient-card"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground text-label">
                      {stat.label}
                    </p>
                    <div className={`p-2 rounded-full ${stat.color}`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="text-3xl font-bold tracking-tighter text-heading">
                      {stat.value}
                    </div>
                    <EnhancedProgress
                      value={stat.progress}
                      showValue={false}
                      size="sm"
                      variant="success"
                    />
                    <p className="text-xs text-muted-foreground font-medium">
                      {stat.trend}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Main Chart Section */}
            <EnhancedChart
              title="Subject Distribution by Department"
              className="col-span-full lg:col-span-4"
              isEmpty={subjectsByDepartment.length === 0}
            >
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={subjectsByDepartment}>
                    {chartGradients.primary}
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      opacity={0.3}
                    />
                    <XAxis
                      dataKey="departmentName"
                      stroke="currentColor"
                      className="text-muted-foreground"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      stroke="currentColor"
                      className="text-muted-foreground"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      content={<ChartTooltip />}
                    />
                    <Area
                      type="monotone"
                      dataKey="totalSubjects"
                      stroke="oklch(0.8348 0.1302 160.908)"
                      fill="url(#gradientPrimary)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </EnhancedChart>

            {/* Side Stats */}
            <EnhancedChart
              title="User Demographics"
              className="col-span-full lg:col-span-3"
              isEmpty={usersByRole.length === 0}
            >
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={usersByRole}
                      dataKey="total"
                      nameKey="role"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      strokeWidth={5}
                      paddingAngle={2}
                    >
                      {usersByRole.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={roleColors[index % roleColors.length]}
                          style={{
                            opacity: hiddenSeries.has(entry.role) ? 0.3 : 1,
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {usersByRole.map((entry, index) => (
                  <button
                    key={entry.role}
                    onClick={() => handleLegendClick(entry.role)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors touch-target-sm"
                  >
                    <div
                      className="w-3 h-3 rounded-full transition-opacity"
                      style={{
                        backgroundColor: roleColors[index % roleColors.length],
                        opacity: hiddenSeries.has(entry.role) ? 0.3 : 1,
                      }}
                    />
                    <span className="capitalize font-medium">
                      {entry.role}:
                    </span>
                    <span className="font-bold text-foreground">
                      {entry.total}
                    </span>
                  </button>
                ))}
              </div>
            </EnhancedChart>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="card-title">Top Departments</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-4">
                  {topDepartments.map((dept, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted touch-target-sm">
                          <span className="text-xs font-bold text-muted-foreground">
                            {i + 1}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          {dept.departmentName}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-muted-foreground">
                        {dept.totalSubjects} Subj
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="card-title">Recent Activity</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-4">
                  {newestClasses.map((cls, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {cls.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Added by {cls.teacher?.name ?? "Admin"}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        New Class
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="card-title">New Faculty</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-4">
                  {newestTeachers.map((teacher, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {teacher.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {teacher.email}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        Teacher
                      </Badge>
                    </div>
                  ))}
                  {newestTeachers.length === 0 && (
                    <span className="text-sm text-muted-foreground">
                      No recent faculty added.
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid gap-6 grid-cols-1">
            <EnrollmentTrends />
            <GradeDistribution />
            <FacultyWorkload />
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <AttendanceReport />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
