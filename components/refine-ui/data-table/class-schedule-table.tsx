"use client";

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
import { Calendar } from "lucide-react";

interface ScheduleItem {
  code: string;
  course: string;
  cr: number;
  timeDays: string;
  room: string;
}

interface ClassScheduleTableProps {
  schedules: ScheduleItem[];
}

export function ClassScheduleTable({ schedules }: ClassScheduleTableProps) {
  if (!schedules || schedules.length === 0) {
    return (
      <Card className="shadow-md border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Class Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            No classes enrolled for this semester.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-md border-border/50">
      <CardHeader className="bg-muted/50 py-4 px-6">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Class Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20">
              <TableHead className="px-6 py-3">Code</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="text-center">Cr</TableHead>
              <TableHead>Time/Days</TableHead>
              <TableHead className="px-6">Room</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((item, index) => (
              <TableRow
                key={index}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="px-6 py-4 font-bold text-primary">
                  {item.code}
                </TableCell>
                <TableCell className="font-medium">{item.course}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="font-mono">
                    {item.cr}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground italic">
                  {item.timeDays}
                </TableCell>
                <TableCell className="px-6 font-semibold">
                  {item.room}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
