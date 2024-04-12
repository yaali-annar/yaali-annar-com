import Link from "next/link";
import { FC, ReactNode } from "react";

interface MenuItem {
  children: ReactNode;
  href: string;
}

interface NavBarProps {
  menuItems?: MenuItem[];
}

const NavBar: FC<NavBarProps> = ({ menuItems = [] }) => {
  return (
    <nav className="flex p-2 lg:p-3 border-b border-yellow-400 justify-between items-center mb-4 lg:mb-8">
      <Link href="/">
        <img
          className="w-8 max-w-8 lg:w-12 lg:max-w-12 mr-4"
          src="/avatar.png"
          alt="avatar"
        />
      </Link>
      <div>
        {menuItems.map((props, index) => (
          <Link key={index} {...props} />
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
