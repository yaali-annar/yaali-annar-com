"use client";

import { Atkinson_Hyperlegible } from "next/font/google";
import { FC, ReactNode } from "react";

import "katex/dist/katex.min.css";
import "./globals.css";

interface BodyProps {
  children: ReactNode;
}

const hyperLegible = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

const Body: FC<BodyProps> = ({ children }) => (
  <body className={hyperLegible.className}>{children}</body>
);

export default Body;
