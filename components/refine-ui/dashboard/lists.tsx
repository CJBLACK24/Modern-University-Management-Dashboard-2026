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
  <Card className="hover:shadow-lg transition-all duration-300 border border-border bg-card shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">
        Top Departments
      </CardTitle>
      <Building2 className="h-4 w-4 text-primary/60" />
    </CardHeader>
    <CardContent>
      <div className="space-y-1 pt-2">
        {data.map((dept, i) => (
          <Link
            key={i}
            href={dept.id ? `/departments/show/${dept.id}` : "#"}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="text-[10px] font-black">{i + 1}</span>
              </div>
              <span className="text-sm font-bold text-foreground/90">
                {dept.departmentName}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-muted-foreground/60 uppercase">
                {dept.totalSubjects} Subjects
              </span>
              <ChevronRight className="h-3 w-3 text-muted-foreground/30 group-hover:text-primary transition-colors" />
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
  <Card className="hover:shadow-lg transition-all duration-300 border border-border bg-card shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">
        Recent Activity
      </CardTitle>
      <Calendar className="h-4 w-4 text-primary/60" />
    </CardHeader>
    <CardContent>
      <div className="space-y-1 pt-2">
        {data.map((cls, i) => (
          <Link
            key={i}
            href={`/classes/show/${cls.id}`}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/50 transition-colors group"
          >
            <div className="space-y-1">
              <p className="text-sm font-bold text-foreground/90 leading-none group-hover:text-primary transition-colors">
                {cls.name}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground/60 tracking-tight">
                Added by {cls.teacher?.name ?? "Admin"}
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-[9px] font-black uppercase border-primary/20 bg-primary/5 text-primary"
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
  <Card className="hover:shadow-lg transition-all duration-300 border border-border bg-card shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">
        New Faculty
      </CardTitle>
      <Users className="h-4 w-4 text-primary/60" />
    </CardHeader>
    <CardContent>
      <div className="space-y-1 pt-2">
        {data.map((teacher, i) => (
          <Link
            key={i}
            href={`/faculty/show/${teacher.id}`}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/50 transition-colors group"
          >
            <div className="space-y-1">
              <p className="text-sm font-bold text-foreground/90 leading-none group-hover:text-primary transition-colors">
                {teacher.name}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground/60 tracking-tight">
                {teacher.email}
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-[9px] font-black uppercase border-secondary/20 bg-secondary/5 text-secondary"
            >
              Teacher
            </Badge>
          </Link>
        ))}
        {data.length === 0 && (
          <div className="p-4 text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
              No recent faculty
            </span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
