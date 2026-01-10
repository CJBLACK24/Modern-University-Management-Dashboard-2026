"use client";

import { Register } from "@/views/register";
import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router";

export default function Page() {
  return (
    <Authenticated key="public-routes" fallback={<Register />}>
      <NavigateToResource />
    </Authenticated>
  );
}
