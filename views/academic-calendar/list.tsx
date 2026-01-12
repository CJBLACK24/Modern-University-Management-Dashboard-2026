"use client";

import { useState } from "react";
import { useList, useCreate } from "@refinedev/core";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UploadWidget from "@/components/upload-widget";
import { Lens } from "@/components/ui/lens";
import { AcademicCalendar } from "@/types";
import { toast } from "sonner";

const AcademicCalendarList = () => {
  const [stagedImage, setStagedImage] = useState<{
    url: string;
    publicId: string;
  } | null>(null);

  const listResult = useList<AcademicCalendar>({
    resource: "academic-calendar",
    pagination: {
      pageSize: 1,
    },
    sorters: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
  });

  // Robustly extract data and status based on the project's specific Refine configuration
  const isLoading = listResult.query?.isLoading;
  const refetch = listResult.query?.refetch;
  const calendarData = listResult.result?.data;
  const queryData = listResult.query?.data;

  // Attempt to find the latest calendar from either the processed 'result' or the raw 'query data'
  const currentCalendar =
    calendarData?.[0] ||
    (Array.isArray(queryData)
      ? queryData[0]
      : (queryData as { data: AcademicCalendar[] })?.data?.[0]);

  const {
    mutate: createCalendar,
    mutation: { isPending: isUpdating },
  } = useCreate<AcademicCalendar>();

  const handleUpdate = () => {
    if (stagedImage) {
      createCalendar(
        {
          resource: "academic-calendar",
          values: {
            url: stagedImage.url,
            publicId: stagedImage.publicId,
            year: 2026,
          },
        },
        {
          onSuccess: () => {
            setStagedImage(null);
            if (refetch) refetch();
          },
          onError: (error) => {
            console.error("Update error:", error);
            toast.error("Failed to update official calendar");
          },
        }
      );
    }
  };

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Academic Calendar 2026</h1>

      <div className="intro-row">
        <p>View and manage the official university academic calendar.</p>
      </div>

      <Separator />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Column: Calendar Preview */}
        <Card className="border-border bg-sidebar/50 overflow-hidden shadow-lg h-full flex flex-col">
          <CardHeader className="text-center bg-sidebar/80 shrink-0">
            <CardTitle className="text-xl font-bold text-gradient-orange">
              Official University Calendar
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-0 flex-1 flex items-center justify-center bg-black/5 min-h-[600px] overflow-hidden">
            {isLoading ? (
              <div className="w-full h-full animate-pulse bg-muted-foreground/10" />
            ) : currentCalendar ? (
              <Lens className="w-full h-full flex items-center justify-center cursor-zoom-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentCalendar.url}
                  alt="Academic Calendar 2026"
                  className="w-full h-full object-contain"
                />
              </Lens>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <p className="text-muted-foreground font-medium">
                  No academic calendar uploaded yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Upload Controls */}
        <Card className="border-border bg-sidebar/50 overflow-hidden shadow-lg h-full">
          <CardHeader className="text-center bg-sidebar/80">
            <CardTitle className="text-xl font-bold text-gradient-orange">
              Management & Updates
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upload New Calendar</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select a high-resolution image for the 2026 academic year. The
                system will automatically archive the previous version.
              </p>

              <div className="pt-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Uploaded file
                </p>
                <div className="space-y-4">
                  <UploadWidget value={stagedImage} onChange={setStagedImage} />

                  {stagedImage && (
                    <Button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    >
                      {isUpdating ? "Updating..." : "Update Official Calendar"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Guidelines</h3>
              <ul className="text-sm text-muted-foreground space-y-3 list-none">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Recommended aspect ratio: 3:4 (Portrait)
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Maximum file size: 5MB
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Supported formats: PNG, JPG, JPEG
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Ensure all text is legible and follows branding rules
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </ListView>
  );
};

export default AcademicCalendarList;
