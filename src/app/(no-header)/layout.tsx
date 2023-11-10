import type { Metadata } from "next";
import "@/globals.css";
import Footer from "@/components/core/Footer";

export const metadata: Metadata = {
  title: "Net Zero",
  description: "Net Zero",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
