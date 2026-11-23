import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";

const pixel = Silkscreen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Arcade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pixel.variable}>{children}</body>
    </html>
  );
}