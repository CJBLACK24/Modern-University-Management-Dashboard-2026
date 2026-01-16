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
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => (
        <Card
          key={stat.label}
          className="group relative overflow-hidden border border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-2 sparkle-container"
        >
          {/* Sparkle Micro-FX */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-sparkle opacity-0 group-hover:opacity-100"
                style={{
                  top: `${20 + i * 25}%`,
                  left: `${30 + i * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  color: `var(--${stat.color.split(" ")[0].split("-")[1]})`,
                }}
              >
                ✦
              </div>
            ))}
          </div>

          <CardContent className="p-7 md:p-8 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                  {stat.label}
                </p>
                <div className="text-4xl md:text-5xl font-black tracking-tighter text-foreground font-outfit drop-shadow-sm">
                  {stat.value}
                </div>
              </div>
              <div
                className={`p-4 md:p-5 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-500 ${stat.color} bg-opacity-10 flex-shrink-0 animate-float`}
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <stat.icon className="h-6 w-6 md:h-8 md:w-8" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="relative h-2.5 w-full bg-muted/50 rounded-full overflow-hidden border border-border/5">
                <div
                  className={`absolute left-0 top-0 h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r ${stat.color
                    .split(" ")[0]
                    .replace("text-", "from-")}-500 ${stat.color
                    .split(" ")[0]
                    .replace(
                      "text-",
                      "to-"
                    )}-400 shadow-[0_0_12px_rgba(0,0,0,0.1)]`}
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-2 w-2 rounded-full animate-pulse ${stat.color
                      .split(" ")[0]
                      .replace("text-", "bg-")}`}
                  />
                  <span className="text-xs font-bold text-muted-foreground tracking-tight">
                    {stat.trend}
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-background/80 border border-border/50 shadow-inner">
                  <span className="text-[10px] font-black text-primary uppercase tabular-nums">
                    {stat.progress}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Decorative Corner Glow */}
          <div
            className={`absolute -right-16 -bottom-16 h-40 w-40 rounded-full blur-[70px] opacity-10 transition-all duration-700 group-hover:opacity-30 group-hover:scale-150 ${stat.color
              .split(" ")[0]
              .replace("text-", "bg-")}`}
          />
        </Card>
      ))}
    </div>
  );
};
