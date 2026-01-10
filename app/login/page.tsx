"use client";

import { Login } from "@/views/login";
import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router";

export default function Page() {
  return (
    <Authenticated key="public-routes" fallback={<Login />}>
      <NavigateToResource />
    </Authenticated>
  );
}
