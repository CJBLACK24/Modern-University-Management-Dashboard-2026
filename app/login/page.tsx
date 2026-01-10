"use client";

import { Login } from "@/views/login";
import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router";
import { AuthSkeleton } from "@/components/auth-skeleton";

export default function Page() {
  return (
    <Authenticated
      key="public-routes"
      fallback={<Login />}
      loading={<AuthSkeleton />}
    >
      <NavigateToResource />
    </Authenticated>
  );
}
