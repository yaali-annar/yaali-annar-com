import Link from "next/link";
import { FC } from "react";
import { menu } from "./data";

const NavBar: FC = () => {
  return (
    <nav className="flex p-2 lg:p-3 border-b border-yellow-400 justify-between items-center mb-4 lg:mb-8">
      <Link href="/">
        <img
          className="w-8 max-w-8 lg:w-12 lg:max-w-12 mr-4"
          src="/avatar.png"
          alt="avatar"
        />
      </Link>
      <div className="flex gap-4">
        {menu.map(({ label, href = "" }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
