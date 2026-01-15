"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeRange } from "@/components/ui/time-range-selector";

// Dashboard Components
import { DashboardHeader } from "@/components/refine-ui/dashboard/header";
import { StatCards } from "@/components/refine-ui/dashboard/stat-cards";
import {
  DistributionChart,
  DemographicsChart,
} from "@/components/refine-ui/dashboard/charts";
import {
  TopDepartments,
  RecentActivity,
  NewFaculty,
} from "@/components/refine-ui/dashboard/lists";

// Analytics Components
import { EnrollmentTrends } from "@/views/analytics/enrollment-trends";
import { GradeDistribution } from "@/views/analytics/grade-distribution";
import { FacultyWorkload } from "@/views/analytics/faculty-workload";
import { AttendanceReport } from "@/views/analytics/attendance-report";

// Hooks
import { useDashboardData } from "@/hooks/use-dashboard-data";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [activeTab, setActiveTab] = useState("overview");

  const {
    users,
    subjects,
    departments,
    classes,
    getSubjectsByDepartment,
    getDemographicsByYear,
    newestClasses,
    newestTeachers,
    topDepartments,
  } = useDashboardData();

  return (
    <div className="space-y-8 p-1">
      <DashboardHeader timeRange={timeRange} setTimeRange={setTimeRange} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview" className="touch-target-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="touch-target-sm">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="touch-target-sm">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Stat Cards */}
          <StatCards
            users={users}
            classes={classes}
            subjects={subjects}
            departments={departments}
          />

          {/* Subject Distribution - Full Width with Year and Semester Selectors */}
          <DistributionChart
            getSubjectsByDepartment={getSubjectsByDepartment}
          />

          {/* Top Departments, Recent Activity, New Faculty - 3 Columns */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TopDepartments data={topDepartments} />
            <RecentActivity data={newestClasses} />
            <NewFaculty data={newestTeachers} />
          </div>

          {/* User Demographics - Full Width Below the Lists */}
          {/* User Demographics - Full Width Below the Lists */}
          <DemographicsChart
            getDemographicsByYear={getDemographicsByYear}
            departments={departments}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid gap-6 grid-cols-1">
            <EnrollmentTrends />
            <GradeDistribution />
            <FacultyWorkload />
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <AttendanceReport />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
