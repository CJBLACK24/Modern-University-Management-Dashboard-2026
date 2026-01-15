"use client";

import React from "react";
import { Skeleton } from "./BaseSkeleton";

export const OAuthButtonSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-3 h-10 w-full rounded-md border border-border bg-background">
      <Skeleton className="h-5 w-5 rounded-sm" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
};

export const OAuthSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <OAuthButtonSkeleton />
      <OAuthButtonSkeleton />
    </div>
  );
};