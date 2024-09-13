import { Metadata } from "next";
import Utility from "./page";
import { FC, ReactNode } from "react";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Utilities",
};

interface LayoutProps {
  children: ReactNode;
}

const UtilityLayout: FC<LayoutProps> = ({ children }) => (
  <>
    <NavBar />
    <main className="space-y-4 lg:space-y-6 pb-4 lg:pb-6">{children}</main>
  </>
);

export default UtilityLayout;
