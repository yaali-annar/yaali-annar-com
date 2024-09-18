import type { Metadata } from "next";
import type { FC } from "react";

import type { ChildrenOnlyProps } from "../types";

import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Utilities",
};

const UtilityLayout: FC<ChildrenOnlyProps> = ({ children }) => (
  <>
    <NavBar />
    <main className="space-y-4 lg:space-y-6 pb-4 lg:pb-6">{children}</main>
  </>
);

export default UtilityLayout;
