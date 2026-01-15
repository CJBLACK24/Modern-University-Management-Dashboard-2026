/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useOne, useList } from "@refinedev/core";
import { useParams } from "next/navigation";
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
import { Button } from "@/components/ui/button";

export const StudentTranscriptView = () => {
  const { id } = useParams();
  const studentId = id as string;

  const { query: userQuery } = useOne({
    resource: "users",
    id: studentId,
  });
  const student = userQuery?.data?.data;

  const { query: enrollmentQuery } = useList({
    resource: "enrollments",
    filters: [{ field: "studentId", operator: "eq", value: studentId }],
  });
  const enrollments = enrollmentQuery?.data?.data || [];

  const calculateGWA = () => {
    if (!enrollments.length) return "N/A";
    // Filter out null grades
    const grades = enrollments
      .map((e) => e.grade)
      .filter((g) => g !== null && g !== undefined) as number[];
    if (!grades.length) return "N/A";

    const sum = grades.reduce((a, b) => a + b, 0);
    const average = sum / grades.length;
    return average.toFixed(2);
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Official Transcript
          </h1>
          <p className="text-muted-foreground">Student Academic Record</p>
        </div>
        <Button variant="outline" onClick={() => window.print()}>
          Print Record
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p className="text-lg font-bold">{student.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Student ID
            </p>
            <p className="text-lg font-mono">{student.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Year Level
            </p>
            <p>{student.yearLevel ? `${student.yearLevel}th Year` : "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Section</p>
            <p>{student.section || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">GWA</p>
            <Badge variant="secondary" className="text-lg">
              {calculateGWA()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Academic History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Code</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((enrollment: any) => {
                const grade = enrollment.grade as number;
                // College passing is usually 3.0 or lower (1.0 is best)
                const passed = grade && grade <= 3.0;
                return (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {enrollment.classInviteCode}
                    </TableCell>
                    <TableCell
                      className={
                        passed
                          ? "text-emerald-600 font-bold"
                          : "text-destructive font-bold"
                      }
                    >
                      {grade ? grade.toFixed(2) : "N/A"}
                    </TableCell>
                    <TableCell>
                      {grade ? (
                        <Badge variant={passed ? "outline" : "destructive"}>
                          {passed
                            ? grade === 3.0
                              ? "PASSED (Lowest)"
                              : "PASSED"
                            : "FAILED"}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">IP</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
