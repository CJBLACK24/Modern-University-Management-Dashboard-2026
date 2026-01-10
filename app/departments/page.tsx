"use client";

import DepartmentsList from "@/views/departments/list";
import { Login } from "@/views/login";
import { Authenticated } from "@refinedev/core";
import { Layout } from "@/components/refine-ui/layout/layout";

export default function Page() {
  return (
    <Authenticated key="private-routes" fallback={<Login />}>
      <Layout>
        <DepartmentsList />
      </Layout>
    </Authenticated>
  );
}
