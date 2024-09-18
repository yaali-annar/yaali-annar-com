import type { Metadata } from "next";
import type { FC, PropsWithChildren, ReactNode } from "react";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Utilities",
};

const UtilityLayout: FC<PropsWithChildren<Record<string, never>>> = ({ children }) => (
  <>
    <NavBar />
    <main className="space-y-4 lg:space-y-6 pb-4 lg:pb-6">{children}</main>
  </>
);

export default UtilityLayout;
