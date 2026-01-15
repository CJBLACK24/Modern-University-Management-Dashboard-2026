"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";

interface Enrollment {
  id: string;
  grade?: number | null;
  classInviteCode?: string;
}

interface AcademicHistoryProps {
  enrollments: Enrollment[];
}

export const AcademicHistory = ({ enrollments }: AcademicHistoryProps) => (
  <Card className="border-none shadow-xl">
    <CardHeader className="border-b bg-muted/20">
      <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <History className="h-4 w-4" />
        Academic History
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 border-none">
            <TableHead className="font-black text-[10px] uppercase tracking-widest py-4 px-6">
              Subject Code
            </TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-widest py-4 px-6 text-center">
              Final Grade
            </TableHead>
            <TableHead className="font-black text-[10px] uppercase tracking-widest py-4 px-6 text-right">
              Academic Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.map((enrollment) => {
            const grade = enrollment.grade as number;
            const passed = grade && grade <= 3.0;
            return (
              <TableRow
                key={enrollment.id}
                className="hover:bg-muted/10 transition-colors border-b border-muted/50"
              >
                <TableCell className="font-mono font-bold py-4 px-6">
                  {enrollment.classInviteCode}
                </TableCell>
                <TableCell className="text-center py-4 px-6">
                  {grade ? (
                    <span
                      className={`text-lg font-black ${
                        passed ? "text-emerald-500" : "text-destructive"
                      }`}
                    >
                      {grade.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground font-bold italic">
                      N/A
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right py-4 px-6">
                  {grade ? (
                    <Badge
                      className={`font-black uppercase tracking-tighter text-[10px] px-3 ${
                        passed
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }`}
                      variant="outline"
                    >
                      {passed
                        ? grade === 3.0
                          ? "PASSED (Lowest)"
                          : "PASSED"
                        : "FAILED"}
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="font-black text-[10px] bg-blue-500/10 text-blue-600 border-blue-500/20"
                    >
                      IN PROGRESS
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
          {enrollments.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="h-32 text-center text-muted-foreground font-medium italic"
              >
                No academic records found for this student.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
