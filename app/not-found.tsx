"use client";

import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      </div>
    </Suspense>
  );
}
