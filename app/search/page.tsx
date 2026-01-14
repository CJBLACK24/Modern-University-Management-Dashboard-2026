"use client";

import { Authenticated } from "@refinedev/core";
import { SearchView } from "@/views/search";

export default function SearchPage() {
  return (
    <Authenticated key="search">
      <SearchView />
    </Authenticated>
  );
}
