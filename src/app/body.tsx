"use client";

import { Atkinson_Hyperlegible } from "next/font/google";
import type { FC, PropsWithChildren } from "react";

import "katex/dist/katex.min.css";
import "./globals.css";

const hyperLegible = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

const Body: FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => (
  <body className={hyperLegible.className}>{children}</body>
);

export default Body;
