"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./BaseSkeleton";

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
