"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export const TranscriptHeader = () => (
  <div className="flex justify-between items-center bg-linear-to-r from-primary/5 to-transparent p-6 rounded-2xl border border-primary/10">
    <div>
      <h1 className="text-3xl font-black tracking-tight text-primary">
        Official Transcript
      </h1>
      <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs mt-1">
        Academic Infrastructure Suite | Official Record
      </p>
    </div>
    <Button
      variant="outline"
      onClick={() => window.print()}
      className="gap-2 font-bold hover:bg-primary hover:text-white transition-all duration-300"
    >
      <Printer className="h-4 w-4" />
      Print Record
    </Button>
  </div>
);
