"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * SkeletonWrapper smoothly transitions between skeleton and real content.
 */
export const SkeletonWrapper = ({
  isLoading,
  children,
  skeleton,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton: React.ReactNode;
}) => {
  return (
    <div className="relative">
      {isLoading ? (
        <div className="animate-in fade-in duration-500">{skeleton}</div>
      ) : (
        <div className="animate-in fade-in duration-500">{children}</div>
      )}
    </div>
  );
};

/**
 * MetricGridSkeleton replicates the 6-card grid on the dashboard.
 */
export const MetricGridSkeleton = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-muted/20 p-4"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20 shimmer" />
            <Skeleton className="h-4 w-4 shimmer" />
          </div>
          <Skeleton className="mt-2 h-8 w-12 shimmer" />
        </div>
      ))}
    </div>
  );
};

/**
 * DataTableSkeleton mirrors table structures for various resources.
 */
export const DataTableSkeleton = ({
  variant = "faculty",
}: {
  variant?: "faculty" | "subjects" | "departments" | "classes";
}) => {
  const columns = {
    faculty: [
      { name: "Name", width: "w-40" },
      { name: "Email", width: "w-48" },
      { name: "Role", width: "w-24" },
      { name: "Details", width: "w-16" },
    ],
    subjects: [
      { name: "Code", width: "w-20" },
      { name: "Name", width: "w-40" },
      { name: "Department", width: "w-32" },
      { name: "Description", width: "w-56" },
      { name: "Details", width: "w-16" },
    ],
    departments: [
      { name: "Code", width: "w-20" },
      { name: "Name", width: "w-40" },
      { name: "Subjects", width: "w-24" },
      { name: "Description", width: "w-56" },
      { name: "Details", width: "w-16" },
    ],
    classes: [
      { name: "Banner", width: "w-12" },
      { name: "Class Name", width: "w-40" },
      { name: "Status", width: "w-24" },
      { name: "Subject", width: "w-32" },
      { name: "Teacher", width: "w-32" },
      { name: "Capacity", width: "w-20" },
      { name: "Details", width: "w-16" },
    ],
  };

  const activeCols = columns[variant];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48 shimmer" />
        <Skeleton className="h-9 w-24 rounded-md shimmer" />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-72 rounded-md shimmer" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-32 rounded-md shimmer" />
          <Skeleton className="h-9 w-32 rounded-md shimmer" />
        </div>
      </div>

      {/* Table Body */}
      <div className="rounded-md border">
        {/* Table Header Row */}
        <div className="border-b bg-muted/50 p-4">
          <div className="flex gap-4">
            {activeCols.map((col, idx) => (
              <div key={idx} className={cn("font-medium", col.width)}>
                <Skeleton className="h-4 w-full shimmer" />
              </div>
            ))}
          </div>
        </div>
        {/* Table Rows */}
        <div className="divide-y">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4">
              <div className="flex gap-4">
                {activeCols.map((col, idx) => (
                  <div key={idx} className={col.width}>
                    {col.name === "Banner" ? (
                      <Skeleton className="h-10 w-10 shimmer" />
                    ) : (
                      <Skeleton className="h-4 w-full shimmer" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32 shimmer" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24 shimmer" />
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8 rounded-md shimmer" />
            <Skeleton className="h-8 w-8 rounded-md shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * EnrollmentFormSkeleton mirrors the Two-column enrollment page.
 */
export const EnrollmentFormSkeleton = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Join by Code */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 shimmer" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40 shimmer" />
            <Skeleton className="h-12 w-full shimmer" />
            <Skeleton className="h-3 w-64 shimmer" />
          </div>
          <Skeleton className="h-10 w-full shimmer" />
        </CardContent>
      </Card>

      {/* Manual Enrollment */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40 shimmer" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24 shimmer" />
              <Skeleton className="h-10 w-full shimmer" />
            </div>
          ))}
          <Skeleton className="h-10 w-full shimmer" />
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * AuthModalSkeleton mirrors the Login/Signup flow.
 */
export const AuthModalSkeleton = ({
  type = "login",
}: {
  type?: "login" | "signup";
}) => {
  if (type === "signup") {
    return (
      <div className="mx-auto w-full max-w-xl space-y-8 p-6">
        <div className="text-center space-y-2">
          <Skeleton className="mx-auto h-20 w-20 rounded-full shimmer" />
          <Skeleton className="mx-auto h-8 w-48 shimmer" />
          <Skeleton className="mx-auto h-4 w-64 shimmer" />
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20 w-full rounded-lg shimmer" />
            <Skeleton className="h-20 w-full rounded-lg shimmer" />
          </div>
          <Skeleton className="h-40 w-full rounded-md shimmer" />
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20 shimmer" />
                <Skeleton className="h-10 w-full shimmer" />
              </div>
            ))}
          </div>
          <Skeleton className="h-11 w-full rounded-md shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-8 p-6">
      <div className="text-center space-y-2">
        <Skeleton className="mx-auto h-20 w-20 rounded-full shimmer" />
        <Skeleton className="mx-auto h-8 w-48 shimmer" />
        <Skeleton className="mx-auto h-4 w-64 shimmer" />
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-12 shimmer" />
          <Skeleton className="h-10 w-full shimmer" />
        </div>
        <Skeleton className="h-11 w-full rounded-md shimmer" />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-full rounded-md shimmer" />
          <Skeleton className="h-10 w-full rounded-md shimmer" />
        </div>
      </div>
    </div>
  );
};
