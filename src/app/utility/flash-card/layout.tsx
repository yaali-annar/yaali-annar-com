import type { Metadata } from "next";
import type { FC } from "react";

import type { ChildrenOnlyProps } from "@/app/types";

export const metadata: Metadata = {
  title: "Flash Card",
};

const FlashCardLayout: FC<ChildrenOnlyProps> = ({ children }) => (
  <main>{children}</main>
);

export default FlashCardLayout;