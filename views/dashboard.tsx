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
    <div className="space-y-8 px-2 py-4 md:p-1 max-w-[1600px] mx-auto">
      <DashboardHeader timeRange={timeRange} setTimeRange={setTimeRange} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex w-full md:inline-flex md:w-auto h-auto p-1.5 bg-muted/30 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm">
          <TabsTrigger
            value="overview"
            className="flex-1 px-6 py-2.5 text-sm font-bold rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex-1 px-6 py-2.5 text-sm font-bold rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="flex-1 px-6 py-2.5 text-sm font-bold rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="overview"
          className="space-y-12 mt-8 animate-in fade-in duration-500"
        >
          {/* Stat Cards - Grouped for emphasis */}
          <section className="space-y-4">
            <StatCards
              users={users}
              classes={classes}
              subjects={subjects}
              departments={departments}
            />
          </section>

          {/* Subject Distribution - Featured Content */}
          <section className="space-y-4">
            <DistributionChart
              getSubjectsByDepartment={getSubjectsByDepartment}
            />
          </section>

          {/* Top Departments, Recent Activity, New Faculty - Interaction Grid */}
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TopDepartments data={topDepartments} />
            <RecentActivity data={newestClasses} />
            <NewFaculty data={newestTeachers} />
          </section>

          {/* User Demographics - Data Deep Dive */}
          <section className="space-y-4">
            <DemographicsChart
              getDemographicsByYear={getDemographicsByYear}
              departments={departments}
            />
          </section>
        </TabsContent>

        <TabsContent
          value="analytics"
          className="space-y-8 mt-8 animate-in slide-in-from-bottom-4 duration-500"
        >
          <div className="grid gap-8 grid-cols-1">
            <EnrollmentTrends />
            <GradeDistribution />
            <FacultyWorkload />
          </div>
        </TabsContent>

        <TabsContent
          value="reports"
          className="space-y-8 mt-8 animate-in slide-in-from-bottom-4 duration-500"
        >
          <AttendanceReport />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
