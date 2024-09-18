import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";
import Body from "./body";

export const metadata: Metadata = {
  title: "Yaali Annar's Site",
  description: "Babi Landing Page",
};

const RootLayout: FC<PropsWithChildren<Record<string, never>>> = ({ children }) => (
  <html lang="en">
    <Body>{children}</Body>
  </html>
);

export default RootLayout;
