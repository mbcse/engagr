import "./globals.css";
import clsx from "clsx";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppProvider from "./provider";
import NextTopLoader from "nextjs-toploader";

import "@rainbow-me/rainbowkit/styles.css";
import { description, title } from "@/config/variables";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: title,
  description: description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={clsx(inter.className, "bg-slate-900")}>
        <NextTopLoader />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
