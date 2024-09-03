"use client";

import NavBar from "@/components/navbar";
import { buildWord, compileRule } from "@/utils/word-builder";
import Head from "next/head";
import { useState } from "react";

const defaultInput = `C=p,t,k,m,n,ŋ,f,s,h,r,y,w
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
    <>
      <Head>
        <title>Word Builder</title>
      </Head>
      <h1>Word Builder</h1>
      <p>
        This utility allows you to generate words based on a custom regular
        grammar rule set. You can define consonants, vowels, and specific
        patterns to create unique words. Adjust the rules in the input area,
        click &#34;Build Words&#34;, and see the generated output in the
        adjacent area.
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
          <button className="btn btn-primary" onClick={buildWords}>
            Build Words
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

export default WordBuilder;
