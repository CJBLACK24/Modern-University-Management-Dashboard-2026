import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, Calendar, BookOpen } from "lucide-react";
import type { User, Subject, Department, Class } from "@/types";

interface StatCardsProps {
  users: User[];
  classes: Class[];
  subjects: Subject[];
  departments: Department[];
}

export const StatCards = ({
  users,
  classes,
  subjects,
  departments,
}: StatCardsProps) => {
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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="group relative overflow-hidden border border-border bg-card shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-15px_rgba(var(--primary),0.3)]"
        >
          {/* Animated Accent Border */}
          <div
            className={`absolute inset-x-0 top-0 h-1 opacity-70 transition-all duration-500 group-hover:h-1.5 group-hover:opacity-100 ${stat.color
              .split(" ")[0]
              .replace("text-", "bg-")}`}
          />

          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">
                  {stat.label}
                </p>
                <div className="text-4xl font-black tracking-tighter text-foreground font-outfit">
                  {stat.value}
                </div>
              </div>
              <div
                className={`p-4 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${stat.color} bg-opacity-20`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full transition-all duration-1000 ease-out rounded-full ${stat.color
                    .split(" ")[0]
                    .replace("text-", "bg-")}`}
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[11px] font-bold text-muted-foreground/80 tracking-tight">
                    {stat.trend}
                  </span>
                </div>
                <div className="px-2 py-0.5 rounded-md bg-muted">
                  <span className="text-[10px] font-black text-primary uppercase tabular-nums">
                    {stat.progress}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Decorative Corner Glow */}
          <div
            className={`absolute -right-12 -bottom-12 h-32 w-32 rounded-full blur-[60px] opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-125 ${stat.color
              .split(" ")[0]
              .replace("text-", "bg-")}`}
          />
        </Card>
      ))}
    </div>
  );
};
