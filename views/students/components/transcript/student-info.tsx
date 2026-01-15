"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, IdCard, GraduationCap, Building2 } from "lucide-react";

interface StudentInfoProps {
  student: {
    id: string;
    name: string;
    yearLevel?: number;
    section?: string;
  };
  gwa: string;
}

export const StudentInfo = ({ student, gwa }: StudentInfoProps) => (
  <Card className="border-none shadow-xl bg-linear-to-br from-background to-muted/30">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <User className="h-4 w-4" />
        Student Information
      </CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
      <div className="space-y-1">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
          Full Name
        </p>
        <p className="text-lg font-bold text-foreground leading-tight">
          {student.name}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
          <IdCard className="h-3 w-3" />
          Student ID
        </p>
        <p className="text-lg font-mono font-bold text-primary">{student.id}</p>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
          <GraduationCap className="h-3 w-3" />
          Year Level
        </p>
        <p className="text-lg font-bold">
          {student.yearLevel ? `${student.yearLevel}th Year` : "N/A"}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
          <Building2 className="h-3 w-3" />
          Section
        </p>
        <p className="text-lg font-bold">{student.section || "N/A"}</p>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
          General Weighted Average
        </p>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="text-xl font-black px-4 py-1 bg-primary text-white shadow-lg"
          >
            {gwa}
          </Badge>
        </div>
      </div>
    </CardContent>
  </Card>
);
