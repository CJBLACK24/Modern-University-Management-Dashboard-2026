"use client";

import { Authenticated } from "@refinedev/core";
import { Layout } from "@/components/refine-ui/layout/layout";
import { StudentTranscriptView } from "@/views/students/transcript";

export default function TranscriptPage() {
  return (
    <Authenticated key="transcript">
      <Layout>
        <StudentTranscriptView />
      </Layout>
    </Authenticated>
  );
}
