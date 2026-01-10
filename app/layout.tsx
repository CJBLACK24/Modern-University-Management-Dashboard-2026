import { RefineContext } from "@/components/refine-context";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "@/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://upload-widget.cloudinary.com/global/all.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <RefineContext>{children}</RefineContext>
        <Analytics />
      </body>
    </html>
  );
}
