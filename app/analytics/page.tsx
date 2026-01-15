"use client";

import { Authenticated } from "@refinedev/core";
import { Layout } from "@/components/refine-ui/layout/layout";
import { AnalyticsDashboard } from "@/views/analytics";

export default function AnalyticsPage() {
  return (
    <Authenticated key="analytics">
      <Layout>
        <AnalyticsDashboard />
      </Layout>
    </Authenticated>
  );
}
