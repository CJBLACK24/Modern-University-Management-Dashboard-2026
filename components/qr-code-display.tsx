"use client";

import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface QrCodeDisplayProps {
  value: string;
  name: string;
  role: string;
  variant?: "attendance" | "profile";
}

export function QrCodeDisplay({
  value,
  name,
  role,
  variant = "attendance",
}: QrCodeDisplayProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [downloading, setDownloading] = useState(false);

  const [qrData] = useState(() =>
    JSON.stringify({
      id: value,
      type: variant === "attendance" ? "attendance_qr" : "profile_qr",
      timestamp: Date.now(),
    })
  );

  const downloadQRCode = () => {
    if (!svgRef.current) return;
    setDownloading(true);

    try {
      const svg = svgRef.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width + 40; // Add padding
        canvas.height = img.height + 120; // Add padding for text

        if (ctx) {
          // Background
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw QR
          ctx.drawImage(img, 20, 20);

          // Draw Text
          ctx.fillStyle = "#1a1a1a";
          ctx.font = "sr-only font-bold 16px Outfit";
          ctx.textAlign = "center";
          ctx.fillText(name, canvas.width / 2, img.height + 50);

          ctx.fillStyle = "#666666";
          ctx.font = "12px Outfit";
          ctx.fillText(role.toUpperCase(), canvas.width / 2, img.height + 70);

          ctx.font = "10px monospace";
          ctx.fillText(`ID: ${value}`, canvas.width / 2, img.height + 90);

          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = `${name.replace(/\s+/g, "_")}_QR.png`;
          downloadLink.href = pngFile;
          downloadLink.click();

          toast.success("QR Code Downloaded", {
            description: "Your digital identity QR code has been saved.",
          });
        }
      };

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download Failed", {
        description: "Could not generate QR code image.",
      });
    } finally {
      setDownloading(false);
    }
  };

  if (variant === "profile") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white rounded-2xl shadow-sm ring-1 ring-border/20">
          <QRCodeSVG
            ref={svgRef}
            value={qrData}
            size={180}
            level="H"
            includeMargin={true}
          />
        </div>
        <div className="text-center space-y-0.5">
          <p className="font-bold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground font-mono uppercase">
            {value.slice(0, 12)}...
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full max-w-[180px] flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
          onClick={downloadQRCode}
          disabled={downloading}
        >
          {downloading ? (
            <CheckCircle2 className="h-3.5 w-3.5 animate-bounce" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          Download QR
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden border-none shadow-lg bg-gradient-card">
      <CardHeader className="text-center pb-2">
        <Badge variant="outline" className="w-fit mx-auto mb-2 capitalize">
          {role}
        </Badge>
        <CardTitle className="text-xl font-bold tracking-tight">
          Attendance QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 p-6">
        <div className="p-4 bg-white rounded-2xl shadow-inner-lg">
          <QRCodeSVG
            ref={svgRef}
            value={qrData}
            size={200}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "/favicon.ico",
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
        <div className="text-center space-y-1">
          <p className="font-semibold text-heading">{name}</p>
          <p className="text-sm text-muted-foreground font-mono uppercase">
            ID: {value.slice(0, 12)}...
          </p>
        </div>

        <Button
          variant="secondary"
          className="w-full flex items-center gap-2 group"
          onClick={downloadQRCode}
          disabled={downloading}
        >
          {downloading ? (
            <CheckCircle2 className="h-4 w-4 animate-bounce" />
          ) : (
            <Download className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
          )}
          Download QR Code
        </Button>

        <p className="text-xs text-center text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
          Present this QR code to your instructor to record your attendance. The
          code is uniquely tied to your identity.
        </p>
      </CardContent>
    </Card>
  );
}
