"use client";

import SubjectsList from "@/views/subjects/list";
import { Login } from "@/views/login";
import { Authenticated } from "@refinedev/core";
import { Layout } from "@/components/refine-ui/layout/layout";

export default function Page() {
  return (
    <Authenticated key="private-routes" fallback={<Login />}>
      <Layout>
        <SubjectsList />
      </Layout>
    </Authenticated>
  );
}
