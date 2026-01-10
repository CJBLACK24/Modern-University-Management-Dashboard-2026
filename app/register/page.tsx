"use client";

import { Register } from "@/views/register";
import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router";
import { AuthSkeleton } from "@/components/auth-skeleton";

export default function Page() {
  return (
    <Authenticated
      key="public-routes"
      fallback={<Register />}
      loading={<AuthSkeleton />}
    >
      <NavigateToResource />
    </Authenticated>
  );
}
