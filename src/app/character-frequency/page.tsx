"use client";

import { countCharacterFrequency } from "@/utils/letter-frequency";
import Head from "next/head";
import { useState } from "react";

const HomePage = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handleCalculateFrequency = () => {
    const frequency = countCharacterFrequency(input);
    const formattedOutput = Object.entries(frequency)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([character, count]) => `${character}\t${count}`)
      .join("\n");
    setOutput(formattedOutput);
  };

  return (
    <main>
      <Head>
        <title>Character Frequency</title>
      </Head>
      <h1>Character Frequency Analysis</h1>
      <div className="flex">
        <textarea
          className="textarea bg-black text-yellow-400 p-4 rounded border border-yellow-400"
          cols={40}
          rows={20}
          placeholder="Enter text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <div className="p-4">
          <button
            className="btn btn-primary"
            onClick={handleCalculateFrequency}
          >
            Calculate Frequency
          </button>
        </div>
        <textarea
          className="textarea bg-black text-yellow-400 p-4 rounded border border-yellow-400"
          readOnly
          cols={40}
          rows={20}
          value={output}
          placeholder="Output will appear here..."
        ></textarea>
      </div>
    </main>
  );
};

export default HomePage;
