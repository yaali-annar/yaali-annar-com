"use client";

import { countCharacterFrequency } from "@/utils/letter-frequency";
import Head from "next/head";
import { useState } from "react";

const CharacterFrequency = () => {
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
    <>
      <Head>
        <title>Character Frequency</title>
      </Head>
      <h1>Character Frequency Analysis</h1>
      <p>
        This tool analyzes the frequency of each character in your input text.
        Simply enter the text you want to analyze, click &#34;Calculate
        Frequency&#34; and the output will display a list of characters along
        with their respective counts, sorted from most to least frequent.
      </p>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <textarea
          cols={40}
          rows={20}
          placeholder="Enter text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <div>
          <button
            className="btn btn-primary"
            onClick={handleCalculateFrequency}
          >
            Calculate Frequency
          </button>
        </div>
        <textarea
          readOnly
          cols={40}
          rows={20}
          value={output}
          placeholder="Output will appear here..."
        ></textarea>
      </div>
    </>
  );
};

export default CharacterFrequency;
