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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-sidebar p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          <Skeleton className="mt-2 h-8 w-12" />
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
      { name: "Name", width: "w-48" },
      { name: "Email", width: "w-64" },
      { name: "Role", width: "w-32" },
      { name: "Details", width: "w-24 text-right" },
    ],
    subjects: [
      { name: "Code", width: "w-24" },
      { name: "Name", width: "w-64" },
      { name: "Department", width: "w-40" },
      { name: "Description", width: "w-72" },
      { name: "Details", width: "w-24 text-right" },
    ],
    departments: [
      { name: "Code", width: "w-24" },
      { name: "Name", width: "w-64" },
      { name: "Subjects", width: "w-32" },
      { name: "Description", width: "w-72" },
      { name: "Details", width: "w-24 text-right" },
    ],
    classes: [
      { name: "Banner", width: "w-20" },
      { name: "Class Name", width: "w-64" },
      { name: "Status", width: "w-32" },
      { name: "Subject", width: "w-48" },
      { name: "Teacher", width: "w-48" },
      { name: "Capacity", width: "w-24" },
      { name: "Details", width: "w-24 text-right" },
    ],
  };

  const activeCols = columns[variant];

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between pt-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-64 rounded-md" />
          {variant !== "faculty" && (
            <Skeleton className="h-9 w-32 rounded-md" />
          )}
          {variant !== "faculty" && (
            <Skeleton className="h-9 w-24 rounded-md" />
          )}
        </div>
      </div>

      {/* Table Body */}
      <div className="rounded-lg border bg-sidebar/50">
        <div className="border-b p-4">
          <div className="flex items-center gap-4">
            {activeCols.map((col, idx) => (
              <div key={idx} className={cn("font-medium", col.width)}>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              {activeCols.map((col, idx) => (
                <div key={idx} className={cn("flex items-center", col.width)}>
                  {col.name === "Banner" ? (
                    <Skeleton className="h-10 w-10 rounded-md" />
                  ) : col.name === "Name" && variant === "faculty" ? (
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ) : col.name === "Details" ? (
                    <div className="flex justify-end w-full">
                      <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                  ) : (
                    <Skeleton className="h-4 w-full" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Area */}
      <div className="flex items-center justify-between pb-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
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
      <Card className="bg-sidebar/50">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-3 w-64" />
          </div>
          <Skeleton className="h-10 w-24 rounded-md" />
        </CardContent>
      </Card>

      {/* Manual Enrollment */}
      <Card className="bg-sidebar/50">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
          <Skeleton className="h-10 w-32 rounded-md" />
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
