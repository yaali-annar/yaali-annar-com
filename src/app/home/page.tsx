import Link from "next/link";

import Article from "@/components/icon/article";
import Bluesky from "@/components/icon/bluesky";
import Reference from "@/components/icon/reference";
import Telegram from "@/components/icon/telegram";
import Utility from "@/components/icon/utility";

interface LinkData {
  href: string,
  Icon: () => JSX.Element
}

const links: LinkData[] = [
  {
    href: "https://www.t.me/BagasArang",
    Icon: Telegram
  },
  {
    href: "https://bsky.app/profile/yaaliannar.com",
    Icon: Bluesky
  },
  {
    href: "/reference",
    Icon: Reference
  },
  {
    href: "/article",
    Icon: Article
  },
  {
    href: "/utility",
    Icon: Utility
  }
]

const Home = () => (
  <main className="flex flex-col items-center justify-center min-h-screen p-2">
    <img className="w-full max-w-80" src="/avatar.png" alt="avatar" />
    <h1>GM, Oink.</h1>
    <div className="flex justify-center items-center mt-4 gap-x-2">
      {links.map(({ href, Icon }) => {
        if (href.startsWith('https')) {
          return (
            <a href={href} key={href}>
              <Icon />
            </a>
          )
        }
        return (
          <Link href={href} key={href}>
            <Icon />
          </Link>
        )
      })}
    </div>
  </main>
);

export default Home;
