"use client";

import { countCharacterFrequency } from "@/utils/letter-frequency";
import { buildWord, compileRule } from "@/utils/word-builder";
import Head from "next/head";
import { useState } from "react";

const defaultInput = `
C=p,t,k,m,n,ŋ,f,s,h,r,y,w
V=e,o,a
F=<V>(<C>,0-5)
word=(<F>,0-5)<C><F><C><F>(<C><F>,0-5)`;

const WordBuilder = () => {
  const [input, setInput] = useState<string>(defaultInput);
  const [output, setOutput] = useState<string>("");

  const buildWords = () => {
    const rule = compileRule(input);

    const newOutput = [];
    for (let index = 0; index < 1000; index++) {
      newOutput.push(buildWord(rule));
    }
    setOutput(newOutput.join(`\n`));
  };

  return (
    <main>
      <Head>
        <title>Word Builder</title>
      </Head>
      <h1>Word Builder</h1>
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
          <button className="btn btn-primary" onClick={buildWords}>
            Build Words
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

export default WordBuilder;
