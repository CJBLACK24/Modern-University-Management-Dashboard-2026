"use client";

import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface QrCodeDisplayProps {
  value: string;
  name: string;
  role: string;
}

export function QrCodeDisplay({ value, name, role }: QrCodeDisplayProps) {
  const [qrData] = useState(() =>
    JSON.stringify({
      id: value,
      type: "attendance_qr",
      timestamp: Date.now(),
    })
  );

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
        <p className="text-xs text-center text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
          Present this QR code to your instructor to record your attendance. The
          code is uniquely tied to your identity.
        </p>
      </CardContent>
    </Card>
  );
}
