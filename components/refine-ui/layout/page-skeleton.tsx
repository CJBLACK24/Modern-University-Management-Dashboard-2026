import {
  MetricGridSkeleton,
  DataTableSkeleton,
  EnrollmentFormSkeleton,
} from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PageSkeletonProps {
  type?: "list" | "dashboard" | "form" | "show" | "enrollment";
  resource?: "faculty" | "subjects" | "departments" | "classes";
}

export const PageSkeleton = ({
  type = "list",
  resource = "faculty",
}: PageSkeletonProps) => {
  if (type === "dashboard") {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-72" />
        </div>

        <div className="rounded-lg border bg-sidebar/50 p-6">
          <Skeleton className="h-6 w-32 mb-6" />
          <MetricGridSkeleton />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 bg-sidebar/50 border-border">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Skeleton className="h-64 w-64 rounded-full" />
              <div className="flex gap-4 mt-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card title="New Classes" className="bg-sidebar/50 border-border">
              <CardHeader className="pb-0">
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-2 w-20" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card title="New Teachers" className="bg-sidebar/50 border-border">
              <CardHeader className="pb-0">
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-2 w-20" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (type === "enrollment") {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <EnrollmentFormSkeleton />
      </div>
    );
  }

  if (type === "form") {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
        <div className="bg-sidebar/30 h-px w-full" />
        <Card className="max-w-2xl mx-auto mt-8 bg-sidebar/50 border-border">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <div className="bg-sidebar/30 h-px w-full" />
          <CardContent className="p-6 space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}
            <Skeleton className="h-11 w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (type === "show") {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-32" />
        </div>

        <Card className="bg-sidebar/50 border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-sidebar/50 border-border">
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-sidebar/50 border-border">
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <DataTableSkeleton variant={resource} />;
};
