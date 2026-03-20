import type { Metadata } from "next";
import "./globals.css"; // if you have global styles

export const metadata: Metadata = {
  title: "CARINA WIEDEMANN",
  description: "UX RESEARCH & DESIGN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
