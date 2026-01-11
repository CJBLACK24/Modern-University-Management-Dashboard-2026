"use client";

import { Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Toaster } from "@/components/refine-ui/notification/toaster";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";
import {
  BookOpen,
  Building2,
  ClipboardCheck,
  GraduationCap,
  Home,
  Users,
} from "lucide-react";
import React, { Suspense } from "react";

import { dataProvider } from "@/providers/data";
import { authProvider } from "@/providers/auth";
import { liveProvider } from "@/providers/live";

export function RefineContext({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <RefineKbarProvider>
        <Suspense fallback={null}>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "kkWuv7-GgBIfw-P8CGy0",
              }}
              // @ts-expect-error documentTitleHandler exists but is not in the type definition for this version
              documentTitleHandler={({
                resource,
              }: {
                resource: { name: string; meta?: { label?: string } };
              }) => {
                const appName = "University Dashboard";
                const resourceName = resource?.meta?.label ?? resource?.name;
                if (!resourceName) return appName;
                const capitalized =
                  resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
                return `${capitalized} | ${appName}`;
              }}
              title={({ collapsed }: { collapsed: boolean }) => (
                <div className="flex items-center gap-2 px-4 py-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  {!collapsed && (
                    <span className="text-lg font-bold">
                      University Dashboard
                    </span>
                  )}
                </div>
              )}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    label: "Home",
                    icon: <Home />,
                  },
                },
                {
                  name: "subjects",
                  list: "/subjects",
                  create: "/subjects/create",
                  edit: "/subjects/edit/:id",
                  show: "/subjects/show/:id",
                  meta: {
                    label: "Subjects",
                    icon: <BookOpen />,
                  },
                },
                {
                  name: "departments",
                  list: "/departments",
                  show: "/departments/show/:id",
                  edit: "/departments/edit/:id",
                  create: "/departments/create",
                  meta: {
                    label: "Departments",
                    icon: <Building2 />,
                  },
                },
                {
                  name: "users",
                  list: "/faculty",
                  show: "/faculty/show/:id",
                  edit: "/faculty/edit/:id",
                  meta: {
                    label: "Faculty",
                    icon: <Users />,
                  },
                },
                {
                  name: "enrollments",
                  list: "/enrollments/create",
                  create: "/enrollments/create",
                  meta: {
                    label: "Enrollments",
                    icon: <ClipboardCheck />,
                  },
                },
                {
                  name: "classes",
                  list: "/classes",
                  create: "/classes/create",
                  edit: "/classes/edit/:id",
                  show: "/classes/show/:id",
                  meta: {
                    label: "Classes",
                    icon: <GraduationCap />,
                  },
                },
              ]}
            >
              <div className="bg-background min-h-screen">{children}</div>
              <Toaster />
              <RefineKbar />
            </Refine>
          </DevtoolsProvider>
        </Suspense>
      </RefineKbarProvider>
    </ThemeProvider>
  );
}
