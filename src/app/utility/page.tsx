"use client";

import NavBar from "@/components/navbar";
import Head from "next/head";
import Link from "next/link";

const utilities = [
  { label: "Character Frequency Counter", href: "character-frequency" },
  { label: "Sound Changer", href: "sound-change" },
  { label: "Word Builder", href: "word-builder" },
];

const Utility = () => (
  <>
    <Head>
      <title>Utilities</title>
    </Head>
    <h1>Utilities</h1>
    <div className="space-y-4 lg:space-y-6">
      {utilities.map(({ label, href }) => (
        <h2 key={href}>
          <Link href={`/utility/${href}`}>{label}</Link>
        </h2>
      ))}
    </div>
  </>
);

export default Utility;
