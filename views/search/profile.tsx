/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useList, useOne } from "@refinedev/core";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export const StudentProfileView = () => {
  const { id } = useParams();
  const studentId = id as string;

  // 1. Fetch Student Data (User)
  // We need to filter by our 'custom' ID structure if possible, but for now we assume the ID in URL matches the 'id' field in DB.
  // Since our seed data uses "50001", "50002" as string IDs, this works.
  // Since our seed data uses "50001", "50002" as string IDs, this works.
  const { query: userQuery } = useOne({
    resource: "users",
    id: studentId,
  });

  const userData = userQuery?.data;
  const userLoading = userQuery?.isLoading;

  const student = userData?.data;

  // 2. Fetch Enrollments for this student
  const { query: enrollmentQuery } = useList({
    resource: "enrollments",
    filters: [
      {
        field: "studentId",
        operator: "eq",
        value: studentId,
      },
    ],
  });

  const enrollmentData = enrollmentQuery?.data;
  const enrollLoading = enrollmentQuery?.isLoading;

  const enrollments = enrollmentData?.data || [];

  // 3. Fetch Classes details for these enrollments
  // In a real app we'd likely have this joined. Here we might need to fetch classes manually or hope the enrollment resource includes them.
  // Assuming our API might not auto-join everything perfectly, let's try to get class details.
  // For 'useList', if we can't do complex joins, we might just display what we have or do a second fetch.
  // Let's assume for this "Certificate" view, we really want Subject Code, Description, Room, Units.
  // The User Request mentions: Code (subject code), Course (subject name/desc), Room (CB 31), Lab Fee, etc.

  // We will Mock the "Room", "Units", and "Fees" because our Schema doesn't have them yet.
  // "Code" and "Course" come from the Class/Subject relation.

  const isLoading = userLoading || enrollLoading;

  if (isLoading) {
    return <div className="p-8 text-center">Loading Student Record...</div>;
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="text-2xl font-bold text-destructive">
          Student Not Found
        </h2>
        <p>Could not find a student with ID: {studentId}</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  // --- MOCK / CALCULATED DATA FOR DEMO ---
  const currentSys = "2nd Semester 2025-2026";
  const assessmentData = {
    tuition: 4640.0,
    misc: 8743.94,
    lab: 610.5,
    total: 18150.76,
    breakdown: [
      { label: "Down Payment", amount: 2199.12 },
      { label: "Pay before Midterm", amount: 6353.07 },
      { label: "Pay before PreFinal", amount: 6353.07 },
      { label: "Pay before Final", amount: 3245.5 },
    ],
  };

  // Helper to get random room/units since DB doesn't have it
  const getRandomDetails = (seed: string) => {
    const rooms = ["CB 31", "CB 32", "LB 102", "AVR 1", "GYM"];
    const units = [3, 2, 5];
    const hash = seed.length;
    return {
      room: rooms[hash % rooms.length],
      units: units[hash % units.length],
    };
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl print:p-0">
      <Card className="border-2 border-primary/10 shadow-xl bg-white/50 backdrop-blur-sm print:shadow-none print:border-none">
        <CardHeader className="text-center border-b pb-6">
          <div className="flex justify-center mb-4">
            {/* Placeholder for University Logo */}
            <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
              🎓
            </div>
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-widest text-primary">
            Western Institute of Technology
          </h1>
          <p className="text-sm text-muted-foreground uppercase">
            Luna St. La Paz, Iloilo City
          </p>
          <h2 className="text-xl font-bold mt-2 uppercase">
            Certificate of Matriculation
          </h2>
          <p className="font-semibold text-primary">{currentSys}</p>
        </CardHeader>

        <CardContent className="pt-6 space-y-8">
          {/* Student Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-semibold text-muted-foreground">
                ID No:
              </span>
              <span className="font-mono font-bold text-lg">{student.id}</span>

              <span className="font-semibold text-muted-foreground">Name:</span>
              <span className="font-bold uppercase">{student.name}</span>

              <span className="font-semibold text-muted-foreground">
                Program:
              </span>
              <span>{student.departmentCode || "N/A"}</span>

              <span className="font-semibold text-muted-foreground">Year:</span>
              <span>{student.yearLevel || 1}</span>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-semibold text-muted-foreground">Type:</span>
              <span>Old Student</span> {/* Mocked */}
              <span className="font-semibold text-muted-foreground">
                Category:
              </span>
              <span>Regular</span>
              <span className="font-semibold text-muted-foreground">Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <Separator />

          {/* Enrolled Courses Table */}
          <div>
            <Table>
              <TableHeader className="bg-primary/5">
                <TableRow>
                  <TableHead className="font-bold text-primary">Code</TableHead>
                  <TableHead className="font-bold text-primary">
                    Course Description
                  </TableHead>
                  <TableHead className="text-center">Units</TableHead>
                  <TableHead className="text-center">Room</TableHead>
                  <TableHead className="text-right">Lab Fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.length > 0 ? (
                  enrollments.map((enrollment: any) => {
                    // Extract class data if available, otherwise parse ID
                    // In the seed, classInviteCode looks like "BSIT-11-1-A"
                    // We can try to parse subject code from it if we don't have full class relation
                    // Assume `enrollment.class` would be populated if using correct hook, but let's be safe
                    const code =
                      enrollment.class?.subjectCode ||
                      enrollment.classInviteCode
                        ?.split("-")
                        .slice(0, 3)
                        .join("-");
                    const desc =
                      enrollment.class?.name || "Official Course Subject";
                    const extra = getRandomDetails(enrollment.id);

                    return (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-medium">{code}</TableCell>
                        <TableCell>{desc}</TableCell>
                        <TableCell className="text-center">
                          {extra.units}
                        </TableCell>
                        <TableCell className="text-center">
                          {extra.room}
                        </TableCell>
                        <TableCell className="text-right">
                          {/* Deterministic fee based on char code of ID */}
                          {(enrollment.id.charCodeAt(0) % 2 === 0
                            ? 610.5
                            : 0
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No enrolled classes found.
                    </TableCell>
                  </TableRow>
                )}
                {/* Totals Row */}
                <TableRow className="bg-primary/5 font-bold">
                  <TableCell>Totals</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-center">
                    {enrollments.length * 3}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">
                    {assessmentData.lab.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Assessment Breakdown */}
            <div className="space-y-2 text-sm border p-4 rounded-md bg-muted/20">
              <h3 className="font-bold border-b pb-2 mb-2 uppercase tracking-wider">
                Assessment
              </h3>
              <div className="flex justify-between">
                <span>Tuition Fee:</span>
                <span>{assessmentData.tuition.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Miscellaneous Fee:</span>
                <span>{assessmentData.misc.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Lab Fee:</span>
                <span>{assessmentData.lab.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total Assessment:</span>
                <span>{assessmentData.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Schedule of Payment */}
            <div className="space-y-2 text-sm border p-4 rounded-md bg-primary/5">
              <h3 className="font-bold border-b pb-2 mb-2 uppercase tracking-wider flex items-center justify-between">
                Schedule of Payment
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600 bg-green-50"
                >
                  PAID
                </Badge>
              </h3>
              {assessmentData.breakdown.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className={i === 0 ? "font-bold" : ""}>
                    {item.label}:
                  </span>
                  <span className="font-mono">
                    {item.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))}

              <div className="mt-6 pt-4 border-t text-xs text-center text-muted-foreground italic">
                (Tuition and other school fees are subject to adjustment)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-12 text-center text-xs">
            <div className="border-t pt-2">
              <p className="font-bold">Treasurer</p>
            </div>
            <div className="border-t pt-2">
              <p className="font-bold">NSTP</p>
            </div>
            <div className="border-t pt-2">
              <p className="font-bold">Student Government</p>
            </div>
          </div>

          <div className="text-center pt-8">
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="print:hidden"
            >
              🖨️ Print Certificate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Input for Quick Switch */}
      <div className="mt-8 flex justify-center print:hidden">
        <Button
          variant="link"
          onClick={() => (window.location.href = "/search")}
        >
          ← Search Another Student
        </Button>
      </div>
    </div>
  );
};
