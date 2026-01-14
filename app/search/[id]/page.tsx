"use client";

import { Authenticated } from "@refinedev/core";
import { StudentProfileView } from "@/views/search/profile";

export default function SearchResultPage() {
  return (
    <Authenticated key="search-id">
      <StudentProfileView />
    </Authenticated>
  );
}
