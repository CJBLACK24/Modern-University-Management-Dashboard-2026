"use client";

import { useGo } from "@refinedev/core";
import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const SearchView = () => {
  const [studentId, setStudentId] = useState("");
  const go = useGo();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      go({
        to: `/search/${studentId}`,
        type: "push",
      });
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <div className="mx-auto w-full max-w-md text-center mb-8">
        <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-orange-500 bg-clip-text text-transparent mb-2">
          Student Portal
        </h1>
        <p className="text-muted-foreground">
          Enter your Student ID Number to view your Certificate of Matriculation
        </p>
      </div>

      <Card className="w-full max-w-md shadow-lg border-primary/20">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Enter Student ID (e.g., 50001)"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="pl-9"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-2xl opacity-50 pointer-events-none">
        {/* Decorative truncated matriculation preview */}
        <div className="h-32 bg-card rounded-lg border border-dashed border-border" />
        <div className="h-32 bg-card rounded-lg border border-dashed border-border" />
      </div>
    </div>
  );
};
