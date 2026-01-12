"use client";

import React from "react";
import { Skeleton } from "./BaseSkeleton";

export const CardSkeleton = () => {
  return (
    <div className="rounded-lg border border-border bg-sidebar p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="mt-6">
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
    </div>
  );
};
