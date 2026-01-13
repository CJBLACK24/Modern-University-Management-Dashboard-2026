/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useLink, useList } from "@refinedev/core";
import {
  Bar,
  BarChart,
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
  GraduationCap,
  Layers,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
          <span className="text-xs font-medium text-muted-foreground uppercase">
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
  const Link = useLink();
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

  const classesBySubject = useMemo(() => {
    const counts = classes.reduce<Record<string, number>>((acc, classItem) => {
      const subjectName = classItem.subject?.name ?? "Unassigned";
      acc[subjectName] = (acc[subjectName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([subjectName, totalClasses]) => ({
      subjectName,
      totalClasses,
    }));
  }, [classes]);

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

  const topSubjectsWithClasses = useMemo(() => {
    return [...classesBySubject]
      .sort((a, b) => b.totalClasses - a.totalClasses)
      .slice(0, 6)
      .map((sub) => ({
        ...sub,
        id: subjects.find((s) => s.name === sub.subjectName)?.id,
      }));
  }, [classesBySubject, subjects]);

  const kpis = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      accent: "text-blue-600",
    },
    {
      label: "Teachers",
      value: users.filter((user) => user.role === "teacher").length,
      icon: GraduationCap,
      accent: "text-emerald-600",
    },
    {
      label: "Admins",
      value: users.filter((user) => user.role === "admin").length,
      icon: ShieldCheck,
      accent: "text-amber-600",
    },
    {
      label: "Subjects",
      value: subjects.length,
      icon: BookOpen,
      accent: "text-purple-600",
    },
    {
      label: "Departments",
      value: departments.length,
      icon: Building2,
      accent: "text-cyan-600",
    },
    {
      label: "Classes",
      value: classes.length,
      icon: Layers,
      accent: "text-rose-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="text-muted-foreground">
          A quick snapshot of the latest activity and key metrics.
        </p>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg border border-border bg-muted/20 p-4 hover:border-primary/40 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted-foreground">
                    {kpi.label}
                  </p>
                  <kpi.icon className={`h-4 w-4 ${kpi.accent}`} />
                </div>
                <div className="mt-2 text-2xl font-semibold">{kpi.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="total"
                    nameKey="role"
                    data={usersByRole}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {usersByRole.map((entry, index) => (
                      <Cell
                        key={`${entry.role}-${index}`}
                        fill={roleColors[index % roleColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-border bg-background/95 p-3 shadow-xl backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    payload[0].payload.fill || payload[0].color,
                                }}
                              />
                              <span className="text-xs font-medium text-muted-foreground uppercase">
                                {payload[0].name}:
                              </span>
                              <span className="text-sm font-bold text-foreground">
                                {payload[0].value}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2">
              {usersByRole.map((entry, index) => (
                <span
                  key={entry.role}
                  className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: roleColors[index % roleColors.length],
                    }}
                  />
                  {entry.role} · {entry.total}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>New Classes (last 5)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {newestClasses.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Most recent classes added
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>New Teachers (last 5)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {newestTeachers.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Most recent teachers added
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Insights</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] items-stretch">
          <div className="space-y-3 min-h-[350px] flex flex-col">
            <h3 className="text-sm font-semibold text-muted-foreground ml-[85px]">
              Subjects per Department
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={subjectsByDepartment}
                  margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
                >
                  <CartesianGrid
                    horizontal={false}
                    strokeDasharray="3 3"
                    stroke="hsl(var(--muted-foreground))"
                    opacity={0.1}
                  />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    hide={false}
                    tick={{
                      fontSize: 11,
                      fill: "#888888",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="departmentName"
                    width={70}
                    tick={{
                      fontSize: 11,
                      fill: "#888888",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.15 }}
                  />
                  <Bar
                    dataKey="totalSubjects"
                    name="Subjects"
                    fill="#f97316"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="hidden lg:block h-full mx-2"
          />

          <div className="space-y-3 min-h-[350px] flex flex-col">
            <h3 className="text-sm font-semibold text-muted-foreground ml-[85px]">
              Classes per Subject
            </h3>
            <div className="flex-1 min-h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={classesBySubject}
                  margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
                >
                  <CartesianGrid
                    horizontal={false}
                    strokeDasharray="3 3"
                    stroke="hsl(var(--muted-foreground))"
                    opacity={0.1}
                  />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    hide={false}
                    tick={{
                      fontSize: 11,
                      fill: "#888888",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="subjectName"
                    tick={{
                      fontSize: 10,
                      fill: "#888888",
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.15 }}
                  />
                  <Bar
                    dataKey="totalClasses"
                    name="Classes"
                    fill="#0ea5e9"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Newest Classes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {newestClasses.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No recent classes.
              </p>
            )}
            {newestClasses.map((item, index) => (
              <Link
                key={item.id}
                to={`/classes/show/${item.id}`}
                className="flex items-center justify-between rounded-md border border-transparent px-3 py-2 transition-colors hover:border-primary/30 hover:bg-muted/40"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.subject?.name ?? "No subject"} ·{" "}
                      {item.teacher?.name ?? "No teacher"}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">New</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Newest Teachers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {newestTeachers.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No recent teachers.
              </p>
            )}
            {newestTeachers.map((teacher, index) => (
              <Link
                key={teacher.id}
                to={`/faculty/show/${teacher.id}`}
                className="flex items-center justify-between rounded-md border border-transparent px-3 py-2 transition-colors hover:border-primary/30 hover:bg-muted/40"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {teacher.email}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">New</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Departments with Most Subjects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topDepartments.map((dept, index) => (
              <Link
                key={index}
                to={dept.id ? `/departments/show/${dept.id}` : "#"}
                className="flex items-center justify-between rounded-md border border-transparent px-3 py-2 transition-colors hover:border-primary/30 hover:bg-muted/40"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{dept.departmentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {dept.totalSubjects} subjects
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary/5 text-primary"
                >
                  {dept.totalSubjects}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Subjects with Most Classes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topSubjectsWithClasses.map((subject, index) => (
              <Link
                key={index}
                to={subject.id ? `/subjects/show/${subject.id}` : "#"}
                className="flex items-center justify-between rounded-md border border-transparent px-3 py-2 transition-colors hover:border-primary/30 hover:bg-muted/40"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{subject.subjectName}</p>
                    <p className="text-xs text-muted-foreground">
                      {subject.totalClasses} classes
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary/5 text-primary"
                >
                  {subject.totalClasses}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Separator />
    </div>
  );
};

export default Dashboard;
