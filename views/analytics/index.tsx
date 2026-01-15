"use client";

import { EnrollmentTrends } from "./enrollment-trends";
import { GradeDistribution } from "./grade-distribution";
import { FacultyWorkload } from "./faculty-workload";
import { AttendanceReport } from "./attendance-report";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="default" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <EnrollmentTrends />
        </div>
        <div className="col-span-3">
          <GradeDistribution />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FacultyWorkload />

        <AttendanceReport />
      </div>
    </div>
  );
};
