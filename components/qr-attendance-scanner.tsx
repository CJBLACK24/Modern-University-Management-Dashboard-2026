"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Camera, RefreshCcw, UserCheck, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface QrAttendanceScannerProps {
  classId: string;
  onScanSuccess?: (studentId: string) => void;
}

export function QrAttendanceScanner({
  classId,
  onScanSuccess,
}: QrAttendanceScannerProps) {
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const handleAttendance = useCallback(
    async (studentId: string) => {
      if (studentId === lastScanned) return; // Prevent double scanning too quickly

      try {
        const response = await fetch(`/api/classes/${classId}/attendance`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId,
            status: "present",
            date: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          setLastScanned(studentId);
          toast.success("Attendance Recorded", {
            description: `Student ${studentId.slice(0, 8)} marked as present.`,
            icon: <UserCheck className="w-4 h-4 text-emerald-500" />,
          });
          onScanSuccess?.(studentId);

          // Brief pause before next scan
          setTimeout(() => setLastScanned(null), 3000);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to record attendance");
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        toast.error("Attendance Error", {
          description: message,
          icon: <XCircle className="w-4 h-4 text-destructive" />,
        });
      }
    },
    [classId, lastScanned, onScanSuccess]
  );

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scannerRef.current.render(
        async (decodedText) => {
          try {
            const data = JSON.parse(decodedText);
            if (data.type === "attendance_qr" && data.id) {
              handleAttendance(data.id);
            } else {
              toast.error("Invalid QR Code", {
                description: "This QR code is not recognized by the system.",
              });
            }
          } catch {
            // Fallback for raw ID strings
            if (decodedText.length > 10) {
              handleAttendance(decodedText);
            } else {
              toast.error("Scanning Error", {
                description: "Could not parse QR data.",
              });
            }
          }
        },
        () => {
          // Handle scan failure silently to avoid spamming the console
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((err) => console.error("Failed to clear scanner", err));
        scannerRef.current = null;
      }
    };
  }, [isScanning, handleAttendance]);

  return (
    <Card className="w-full border-dashed border-2 bg-muted/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              QR Attendance Scanner
            </CardTitle>
            <CardDescription>
              Scan student QR codes to record attendance in real-time.
            </CardDescription>
          </div>
          <Badge
            variant={isScanning ? "default" : "secondary"}
            className="h-fit"
          >
            {isScanning ? "Active Scanner" : "Scanner Off"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 gap-6">
        {isScanning ? (
          <div className="w-full max-w-md overflow-hidden rounded-xl border-4 border-primary/20 shadow-2xl bg-black">
            <div id="qr-reader" className="w-full"></div>
            <div className="p-4 bg-background flex justify-center">
              <Button
                variant="outline"
                onClick={() => setIsScanning(false)}
                className="gap-2"
              >
                <XCircle className="w-4 h-4" />
                Stop Scanner
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="p-8 rounded-full bg-primary/10 text-primary">
              <Camera className="w-12 h-12" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-semibold text-lg text-heading">
                Ready to Start?
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Ensure your camera permissions are enabled for this browser.
              </p>
            </div>
            <Button
              onClick={() => setIsScanning(true)}
              size="lg"
              className="gap-2 px-8"
            >
              <Camera className="w-4 h-4" />
              Launch Camera Scanner
            </Button>
          </div>
        )}

        {lastScanned && (
          <div className="w-full bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <UserCheck className="w-5 h-5 text-emerald-500" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-400">
                Successfully Recorded
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-500">
                Last scanned: {lastScanned.slice(0, 8)}...
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLastScanned(null)}
            >
              <RefreshCcw className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
