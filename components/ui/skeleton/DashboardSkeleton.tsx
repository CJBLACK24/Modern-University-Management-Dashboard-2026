"use client";

import React from "react";
import { Skeleton } from "./BaseSkeleton";

export const DashboardSkeleton = () => {
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
