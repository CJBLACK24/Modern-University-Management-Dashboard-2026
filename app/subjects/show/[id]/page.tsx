"use client";

import SubjectsShow from "@/views/subjects/show";
import { Login } from "@/views/login";
import { Authenticated } from "@refinedev/core";
import { Layout } from "@/components/refine-ui/layout/layout";

export default function Page() {
  return (
    <Authenticated key="private-routes" fallback={<Login />}>
      <Layout>
        <SubjectsShow />
      </Layout>
    </Authenticated>
  );
}
