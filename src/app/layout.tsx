import type { Metadata } from "next";
import type { FC } from "react";

import Body from "./body";
import type { ChildrenOnlyProps } from "./types";

export const metadata: Metadata = {
  title: "Yaali Annar's Site",
  description: "Babi Landing Page",
};

const RootLayout: FC<ChildrenOnlyProps> = ({ children }) => (
  <html lang="en">
    <Body>{children}</Body>
  </html>
);

export default RootLayout;
