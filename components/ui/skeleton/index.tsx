"use client";

import React from "react";

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

export * from "./BaseSkeleton";
export * from "./CardSkeleton";
export * from "./TableSkeleton";
export * from "./FormSkeleton";
export * from "./DashboardSkeleton";
export * from "./ProfileSkeleton";
export * from "./AuthSkeleton";
