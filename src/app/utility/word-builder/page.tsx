"use client";


import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Head from "next/head";
import type { SubmitHandler } from "react-hook-form";

import TextArea from "@/components/text-area";
import { applyChanges, parseChanges } from "@/utils/sound-change";
import { buildWord, compileRule } from "@/utils/word-builder";
import { countCharacterFrequency } from "@/utils/letter-frequency";

interface Values {
  changes: string,
  emptyMarker: string,
  rules: string,
}

const defaultValues: Values = {
  rules: `C=p,t,k,m,n,ŋ,f,s,h,r,i,u
V=a,i,u,e
F=<V>(<C>,0-5)
word=(<F>,0-5)<C><F><C><F>(<C><F>,0-5)`,
  changes: `V=[aiue]
C=[^aiue]
iyi	i
(<C>|^)yi	$1i
iy(<C>|$)	i$1
uwu	u
(<C>|^)wu	$1u
uw(<C>|$)	u$1`,
  emptyMarker: '-'
}

const textareaProps = {
  rows: 10,
  cols: 50,
};

const WordBuilder = () => {
  const methods = useForm<Values>()
  const [output, setOutput] = useState<string>("");

  const onSubmit: SubmitHandler<Values> = ({ changes, emptyMarker, rules }) => {
    const rule = compileRule(rules);
    const changesArray = parseChanges(changes, emptyMarker);

    const newOutput = [];
    for (let index = 0; index < 1000; index++) {
      let word = buildWord(rule)
      word = applyChanges(word, changesArray);
      newOutput.push(word);
    }

    setOutput(newOutput.join("\n"));
  };

  const frequency = useMemo(() => {
    const characterFrequency = countCharacterFrequency(output);
    return Object.entries(characterFrequency)
      .map(([key, value]) => `${key}\t${value}`)
      .join("\n");
  }, [output]);

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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:gap-6">
          <div className="flex gap-4 lg:gap-6">
            <div>
              <label>Rules</label>
              <TextArea
                allowTab
                defaultValue={defaultValues.rules}
                name="rules"
                {...textareaProps}
              />
            </div>
            <div>
              <label>Input Text</label>
              <TextArea
                allowTab
                defaultValue={defaultValues.changes}
                name="changes"
                {...textareaProps}
              />
            </div>
          </div>
          <div className="flex gap-4 lg:gap-6 items-center">
            <label>Empty Marker</label>
            <select defaultValue={defaultValues.emptyMarker} {...methods.register("emptyMarker")}>
              <option value="-">-</option>
              <option value="0">0</option>
            </select>
            <input type="submit" className="btn btn-primary" />
          </div>
          <div className="flex gap-4 lg:gap-6">
            <div>
              <label>Output Text</label>
              <textarea {...textareaProps} value={output} readOnly />
            </div>
            <div>
              <label>Letter Frequency</label>
              <textarea {...textareaProps} value={frequency} readOnly />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default WordBuilder;
