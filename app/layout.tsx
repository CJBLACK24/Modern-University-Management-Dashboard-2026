import { RefineContext } from "@/components/refine-context";
import "@/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RefineContext>{children}</RefineContext>
      </body>
    </html>
  );
}
