"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

import Bluesky from "@/components/icon/bluesky";
import Reference from "@/components/icon/reference";
import Telegram from "@/components/icon/telegram";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("//")) {
      const newPath = path.replace(/\/\/+/g, "/");
      router.replace(newPath);
    }
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-2">
      <img className="w-full max-w-80" src="/avatar.png" alt="avatar" />
      <h1>GM, Oink.</h1>
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
