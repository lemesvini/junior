import type { Metadata } from "next";
import "./globals.css";
import { Inter, Fira_Code } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' });

export const metadata: Metadata = {
  title: "Junior",
  description: "A powerful, collaborative coding environment with real-time features",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="bg-[#0A0A0A]">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
