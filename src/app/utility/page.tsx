"use client";
import Head from "next/head";
import Link from "next/link";

const utilities = [
  {
    label: "Character Frequency Counter",
    href: "character-frequency",
    description: "Analyze the frequency of characters in a given text. This tool can also perform multigraph analysis."
  },
  {
    label: "Sound Changer",
    href: "sound-change",
    description: "Apply regex-based serial replacements to transform sounds or patterns in text."
  },
  {
    label: "Word Builder",
    href: "word-builder",
    description: "Construct words following regular grammar rules. Ideal for generating or exploring word patterns."
  },
  {
    label: "Flash Card",
    href: "flash-card",
    description: "Create client-side flashcards using local storage. Useful for memorization."
  }
];

const Utility = () => (
  <>
    <Head>
      <title>Utilities</title>
    </Head>
    <h1>Utilities</h1>
    <div className="space-y-4 lg:space-y-6">
      {utilities.map(({ description, href, label }) => (
        <Link className="block" key={href} href={`/utility/${href}`}>
          <h2 >
            {label}
          </h2>
          <p>{description}</p>
        </Link>
      ))}
    </div>
  </>
);

export default Utility;
