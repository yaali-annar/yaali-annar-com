import type { Metadata } from "next";
import type { FC, ReactNode } from "react";
import Body from "./body";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Yaali Annar's Site",
  description: "Babi Landing Page",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <Body>{children}</Body>
  </html>
);

export default RootLayout;
