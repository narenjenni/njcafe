import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NJ Cafe — Order Online",
  description: "NJ Cafe: Specialty coffee, great food, beautiful vibes. Order online now.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
