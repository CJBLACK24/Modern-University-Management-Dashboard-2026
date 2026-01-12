"use client";

import { useList, useCreate } from "@refinedev/core";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UploadWidget from "@/components/upload-widget";
import { AcademicCalendar } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const AcademicCalendarList = () => {
  const { query } = useList<AcademicCalendar>({
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

  const { data, isLoading, refetch } = query;

  const { mutate: createCalendar } = useCreate<AcademicCalendar>();

  const currentCalendar = data?.data?.[0];

  const handleUploadSuccess = (
    value: { url: string; publicId: string } | null
  ) => {
    if (value) {
      createCalendar(
        {
          resource: "academic-calendar",
          values: {
            url: value.url,
            publicId: value.publicId,
            year: 2026,
          },
        },
        {
          onSuccess: () => {
            toast.success("Academic Calendar updated successfully");
            refetch();
          },
          onError: () => {
            toast.error("Failed to update Academic Calendar");
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

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Calendar Preview */}
        <Card className="border-border bg-sidebar/50 overflow-hidden shadow-lg h-full">
          <CardHeader className="text-center bg-sidebar/80">
            <CardTitle className="text-xl font-bold text-gradient-orange">
              Official University Calendar
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[500px]">
            {isLoading ? (
              <div className="w-full aspect-3/4 max-w-sm mx-auto">
                <Skeleton className="w-full h-full rounded-lg" />
              </div>
            ) : currentCalendar ? (
              <div className="relative group w-full max-w-sm mx-auto aspect-3/4 rounded-lg overflow-hidden border border-border shadow-md transition-all hover:shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentCalendar.url}
                  alt="Academic Calendar 2026"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg bg-sidebar/30 w-full max-w-sm mx-auto aspect-3/4">
                <p className="text-muted-foreground text-center">
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
              <p className="text-sm text-muted-foreground">
                Select a high-resolution image for the 2026 academic year. The
                system will automatically archive the previous version.
              </p>
              <UploadWidget onChange={handleUploadSuccess} />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Guidelines</h3>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                <li>Recommended aspect ratio: 3:4 (Portrait)</li>
                <li>Maximum file size: 5MB</li>
                <li>Supported formats: PNG, JPG, JPEG</li>
                <li>Ensure all text is legible and follows branding rules</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </ListView>
  );
};

export default AcademicCalendarList;
