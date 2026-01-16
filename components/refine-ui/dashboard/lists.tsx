"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, Users, ChevronRight } from "lucide-react";
import type { User } from "@/types";
import Link from "next/link";

interface TopDepartmentsProps {
  data: { id?: number; departmentName: string; totalSubjects: number }[];
}

export const TopDepartments = ({ data }: TopDepartmentsProps) => (
  <Card className="glass-card overflow-hidden group/card shadow-lg border-border/50">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 md:p-8 pb-4">
      <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">
        Top Departments
      </CardTitle>
      <div className="p-2 bg-primary/10 rounded-lg group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-500">
        <Building2 className="h-4 w-4 text-primary" />
      </div>
    </CardHeader>
    <CardContent className="px-6 md:px-8 pb-8 pt-2">
      <div className="space-y-3">
        {data.map((dept, i) => (
          <Link
            key={i}
            href={dept.id ? `/departments/show/${dept.id}` : "#"}
            className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all duration-300 group/item animate-in fade-in slide-in-from-right duration-500"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500 shadow-sm">
                <span className="text-xs font-black">{i + 1}</span>
              </div>
              <span className="text-sm font-bold text-foreground/90 group-hover/item:translate-x-1 transition-transform">
                {dept.departmentName}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest bg-muted/30 px-2 py-1 rounded-md">
                {dept.totalSubjects} Subjects
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/20 group-hover/item:text-primary group-hover/item:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </CardContent>
  </Card>
);

interface RecentActivityProps {
  data: {
    id: number;
    name: string;
    teacher?: {
      name: string;
    };
  }[];
}

export const RecentActivity = ({ data }: RecentActivityProps) => (
  <Card className="glass-card overflow-hidden group/card shadow-lg border-border/50">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 md:p-8 pb-4">
      <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">
        Recent Activity
      </CardTitle>
      <div className="p-2 bg-indigo-500/10 rounded-lg group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-500">
        <Calendar className="h-4 w-4 text-indigo-400" />
      </div>
    </CardHeader>
    <CardContent className="px-6 md:px-8 pb-8 pt-2">
      <div className="space-y-3">
        {data.map((cls, i) => (
          <Link
            key={i}
            href={`/classes/show/${cls.id}`}
            className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-indigo-500/5 border border-transparent hover:border-indigo-500/10 transition-all duration-300 group/item animate-in fade-in slide-in-from-right duration-500"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="space-y-1.5 group-hover/item:translate-x-1 transition-transform">
              <p className="text-sm font-bold text-foreground/90 leading-none group-hover/item:text-indigo-400 transition-colors">
                {cls.name}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground/40 tracking-widest uppercase">
                <span className="text-indigo-400/60 mr-1">•</span>
                Added by {cls.teacher?.name ?? "Admin"}
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-[9px] font-black uppercase tracking-wider border-indigo-500/20 bg-indigo-500/5 text-indigo-400 shadow-sm"
            >
              New Class
            </Badge>
          </Link>
        ))}
      </div>
    </CardContent>
  </Card>
);

interface NewFacultyProps {
  data: User[];
}

export const NewFaculty = ({ data }: NewFacultyProps) => (
  <Card className="glass-card overflow-hidden group/card shadow-lg border-border/50">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 md:p-8 pb-4">
      <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">
        New Faculty
      </CardTitle>
      <div className="p-2 bg-emerald-500/10 rounded-lg group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-500">
        <Users className="h-4 w-4 text-emerald-400" />
      </div>
    </CardHeader>
    <CardContent className="px-6 md:px-8 pb-8 pt-2">
      <div className="space-y-3">
        {data.map((teacher, i) => (
          <Link
            key={i}
            href={`/faculty/show/${teacher.id}`}
            className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-emerald-500/5 border border-transparent hover:border-emerald-500/10 transition-all duration-300 group/item animate-in fade-in slide-in-from-right duration-500"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="space-y-1.5 group-hover/item:translate-x-1 transition-transform">
              <p className="text-sm font-bold text-foreground/90 leading-none group-hover:text-emerald-400 transition-colors">
                {teacher.name}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground/40 tracking-widest uppercase truncate max-w-[150px]">
                {teacher.email}
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-[9px] font-black uppercase tracking-wider border-emerald-500/20 bg-emerald-500/5 text-emerald-400 shadow-sm"
            >
              Teacher
            </Badge>
          </Link>
        ))}
        {data.length === 0 && (
          <div className="p-10 text-center space-y-3">
            <div className="flex justify-center">
              <Users className="h-8 w-8 text-muted-foreground/20" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 block">
              No recent faculty members
            </span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
