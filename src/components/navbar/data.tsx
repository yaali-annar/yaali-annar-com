import { ReactNode } from "react";
import Reference from "../icon/reference";
import Article from "../icon/article";
import Utility from "../icon/utility";

interface MenuItem {
  label: ReactNode;
  href?: string;
  children?: MenuItem[];
}

const menu: MenuItem[] = [
  { label: <Reference />, href: "/reference" },
  { label: <Article />, href: "/article" },
  { label: <Utility />, href: "/utility" },
];

export { menu };
