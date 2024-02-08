import Bluesky from "@/components/bluesky";
import Reference from "@/components/reference";
import Telegram from "@/components/telegram";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center bg-black text-yellow-400 w-full min-h-screen p-2">
      <img className="w-full max-w-80" src="/avatar.png" alt="avatar" />
      <h1 className="text-3xl lg:text-4xl mt-4 font-bold">GM, Oink.</h1>
      <div className="flex justify-center items-center mt-4 gap-x-2">
        <a href="https://www.t.me/BagasArang">
          <Telegram />
        </a>
        <a href="https://bsky.app/profile/yaaliannar.bsky.social">
          <Bluesky />
        </a>
        <Link href="/reference">
          <Reference />
        </Link>
      </div>
    </main>
  );
};

export default Home;
