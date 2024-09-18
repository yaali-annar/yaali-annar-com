"use client";

import { Atkinson_Hyperlegible } from "next/font/google";
import type { FC } from "react";

import "katex/dist/katex.min.css";
import "./globals.css";

import type { ChildrenOnlyProps } from "./types";

const hyperLegible = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

const Body: FC<ChildrenOnlyProps> = ({ children }) => (
  <body className={hyperLegible.className}>{children}</body>
);

export default Body;
