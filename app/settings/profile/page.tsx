"use client";

import { Form } from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react";
import { ClassScheduleTable } from "@/components/refine-ui/data-table/class-schedule-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Components
import { ProfileForm } from "./components/profile-form";

// Hooks
import { useProfile } from "./hooks/use-profile";

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { form, isSaving, isLoading, departments, profileData, age, onSubmit } =
    useProfile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="lg:px-6 lg:pt-6 md:p-4 px-2 pt-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="font-outfit">
            <h1 className="text-3xl font-bold tracking-tight text-foreground line-height-1">
              Profile Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your official university profile and identity.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <Form {...form}>
            <ProfileForm
              onSubmit={onSubmit}
              isSaving={isSaving}
              departments={departments}
              age={age}
              profileData={profileData}
            />
          </Form>

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4 px-1">Class Schedule</h2>
            <ClassScheduleTable
              schedules={
                profileData?.enrollments?.map((e) => ({
                  code: e.class?.subject?.code || "N/A",
                  course: e.class?.subject?.name || "N/A",
                  cr: e.class?.subject?.credits || 0,
                  timeDays:
                    e.class?.schedules
                      ?.map((s) => `${s.startTime}-${s.endTime} ${s.day}`)
                      .join(", ") || "TBA",
                  room: e.class?.schedules?.[0]?.room || "TBA",
                })) || []
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
