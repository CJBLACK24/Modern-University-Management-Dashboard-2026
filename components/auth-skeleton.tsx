import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const AuthSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <Skeleton className="h-20 w-20 rounded-full" />
      <Card className="w-full max-w-xl p-6 sm:p-12 space-y-6">
        <CardHeader className="space-y-2 text-center px-0">
          <Skeleton className="h-8 w-3/4 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <Skeleton className="h-12 w-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-px flex-1" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-px flex-1" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <div className="flex justify-center pt-4">
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Card>
    </div>
  );
};
