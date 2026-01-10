import { useSearchParams, useRouter } from "next/navigation";
import { useOne } from "@refinedev/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShowView } from "@/components/refine-ui/views/show-view";

type EnrollmentDetails = {
  id: number;
  class?: {
    id: number;
    name: string;
  };
  subject?: {
    id: number;
    name: string;
  };
  department?: {
    id: number;
    name: string;
  };
  teacher?: {
    id: string;
    name: string;
    email: string;
  };
};

const EnrollmentConfirm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const { query } = useOne<EnrollmentDetails>({
    resource: "enrollments",
    id: id ?? "",
    queryOptions: {
      enabled: !!id,
    },
  });

  const enrollment = query.data?.data;
  const { isLoading, isError } = query;

  if (isLoading) {
    return (
      <ShowView className="class-view">
        <p>Loading enrollment details...</p>
      </ShowView>
    );
  }

  if (!enrollment || isError) {
    return (
      <ShowView className="class-view">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {isError
                ? "Error loading enrollment details."
                : "No enrollment details found."}
            </p>
            <Button className="mt-4" onClick={() => router.push("/classes")}>
              Browse Classes
            </Button>
          </CardContent>
        </Card>
      </ShowView>
    );
  }

  return (
    <ShowView className="class-view space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Confirmed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You have been enrolled successfully.
          </p>
          <div className="flex flex-wrap gap-2">
            {enrollment.department && (
              <Badge variant="secondary">{enrollment.department.name}</Badge>
            )}
            {enrollment.subject && (
              <Badge variant="outline">{enrollment.subject.name}</Badge>
            )}
            {enrollment.class && (
              <Badge variant="outline">{enrollment.class.name}</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Class Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Class</p>
            <p className="text-base font-semibold">
              {enrollment.class?.name ?? "Unknown"}
            </p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Teacher</p>
            <p className="text-base font-semibold">
              {enrollment.teacher?.name ?? "Unknown"}
            </p>
            <p className="text-xs text-muted-foreground">
              {enrollment.teacher?.email ?? "No email"}
            </p>
          </div>
          <Separator />
          <div className="flex gap-2">
            <Button onClick={() => router.push("/classes")}>
              View Classes
            </Button>
            {enrollment.class?.id && (
              <Button
                variant="outline"
                onClick={() =>
                  router.push(`/classes/show/${enrollment.class?.id}`)
                }
              >
                Go to Class
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </ShowView>
  );
};

export default EnrollmentConfirm;
