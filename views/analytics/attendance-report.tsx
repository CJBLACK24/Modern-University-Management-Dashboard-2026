"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FileDown, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
  id: number;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  studentName: string;
  className: string;
  remarks: string;
}

export const AttendanceReport = () => {
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/attendance");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const exportToCSV = () => {
    const headers = ["ID", "Student", "Class", "Date", "Status", "Remarks"];
    const csvContent = [
      headers.join(","),
      ...data.map((record) =>
        [
          record.id,
          `"${record.studentName}"`,
          `"${record.className}"`,
          new Date(record.date).toLocaleDateString(),
          record.status,
          `"${record.remarks || ""}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `attendance-report-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <Skeleton className="h-[400px] w-full rounded-xl" />;

  return (
    <Card className="glass-card shadow-2xl border-border/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 bg-muted/30 border-b border-border/50 gap-4">
        <div>
          <CardTitle className="text-2xl font-black tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Attendance Records
          </CardTitle>
          <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mt-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Real-time Academic Tracking
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="h-10 px-4 rounded-xl border-border/50 bg-background/50 text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 transition-all"
          >
            <Filter className="mr-2 h-3.5 w-3.5" />
            Filter
          </Button>
          <Button
            variant="default"
            size="sm"
            className="h-10 px-6 rounded-xl bg-foreground text-background text-[10px] font-black uppercase tracking-widest hover:bg-foreground/90 transition-all shadow-lg"
            onClick={exportToCSV}
          >
            <FileDown className="mr-2 h-3.5 w-3.5" />
            Export Data
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/20">
              <TableRow className="hover:bg-transparent border-b border-border/50">
                <TableHead className="h-14 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                  Student
                </TableHead>
                <TableHead className="h-14 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                  Class
                </TableHead>
                <TableHead className="h-14 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                  Date & Time
                </TableHead>
                <TableHead className="h-14 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                  Status
                </TableHead>
                <TableHead className="h-14 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((record, i) => (
                <TableRow
                  key={record.id}
                  className="hover:bg-primary/5 transition-colors group border-b border-border/50 animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-background shadow-md">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${record.studentName}`}
                          />
                          <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-black">
                            {record.studentName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                            record.status === "present"
                              ? "bg-emerald-500"
                              : record.status === "absent"
                              ? "bg-destructive"
                              : "bg-amber-500"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
                          {record.studentName}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tighter uppercase whitespace-nowrap">
                          UID: {record.id.toString().padStart(6, "0")}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <Badge
                      variant="outline"
                      className="bg-primary/5 border-primary/10 text-[10px] font-black px-3 py-1 rounded-lg text-primary/80 uppercase tracking-tight"
                    >
                      {record.className}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-8 py-5 text-xs font-bold text-muted-foreground/80">
                    <div className="flex flex-col gap-1">
                      <span>
                        {new Date(record.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-[10px] text-muted-foreground/40 uppercase font-black uppercase">
                        {new Date(record.date).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-5">
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                        record.status === "present"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : record.status === "absent"
                          ? "bg-destructive/10 text-destructive"
                          : record.status === "late"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-muted/10 text-muted-foreground"
                      )}
                    >
                      <div
                        className={cn(
                          "h-1.5 w-1.5 rounded-full animate-pulse",
                          record.status === "present"
                            ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                            : record.status === "absent"
                            ? "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                            : record.status === "late"
                            ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                            : "bg-muted-foreground"
                        )}
                      />
                      {record.status}
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-5 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
                    >
                      Full Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 opacity-30">
                      <div className="h-10 w-10 border-2 border-dashed border-muted-foreground rounded-full" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Empty Archives
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
