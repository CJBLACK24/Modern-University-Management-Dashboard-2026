"use client";

import React from "react";
import { Skeleton } from "./BaseSkeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const FormSkeleton = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Small Section Skeleton */}
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

      {/* Main Form Skeleton */}
      <Card className="bg-sidebar/50">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(3)].map((_, i) => (
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
