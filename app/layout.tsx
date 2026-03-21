import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Edvo — AI Study Platform",
  description: "SACE-aligned AI tutoring for South Australian students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
      </head>
      <body
        className={`${dmSans.variable} ${fraunces.variable} font-sans antialiased`}
        style={{ margin: 0, padding: 0, overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}