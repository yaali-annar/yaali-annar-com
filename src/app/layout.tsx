import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const hyperLegible = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Yaali Annar's Site",
  description: "Babi Landing Page",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={hyperLegible.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
