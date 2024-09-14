"use client";


import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Head from "next/head";
import type { SubmitHandler } from "react-hook-form";

import TextArea from "@/components/text-area";

import { changes, rules, scoring, source } from "./values";
import { compileScore, type PhonemeScore, scoreWord } from "./engine";
import { applyChanges, type Change, parseChanges } from "@/utils/sound-change";
import { buildWord, compileRule, type Rule } from "@/utils/word-builder";

interface Values {
  source: string,
  rules: string,
  changes: string,
  scoring: string
}

const textareaProps = {
  rows: 10,
  cols: 50,
};

type Output = [string, number]

interface OutputCreationParameter {
  changesArray: Change[]
  phonemeScore: PhonemeScore,
  rule: Rule,
  source: string,
}

const WordMixer = () => {
  const methods = useForm<Values>()

  const [output, setOutput] = useState<Output[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [parameter, setParameter] = useState<OutputCreationParameter | null>(null);

  // Create new output based on given parameters
  const createNewOutput = useCallback((parameter: OutputCreationParameter) => {
    const { changesArray, phonemeScore, rule, source } = parameter;
    const newOutput: Output[] = source.split(/[\r\n]+/).map((line) => {
      let candidateWord = buildWord(rule);
      candidateWord = applyChanges(candidateWord, changesArray);

      const sourceWords = line.split(/\t/);
      const totalScore = sourceWords.reduce(
        (acc, sourceWord) => acc + scoreWord(phonemeScore, candidateWord, sourceWord),
        0
      );
      const avgScore = totalScore / sourceWords.length;

      return [candidateWord, avgScore];
    });

    setOutput((oldOutput) => {
      for (let i = 0; i < oldOutput.length; i++) {
        if (oldOutput[i][1] < newOutput[i][1]) {
          newOutput[i] = oldOutput[i]
        }
      }
      return newOutput;
    })
  }, []);

  // Handles continuous output generation while `isRunning` is true
  useEffect(() => {
    if (isRunning && parameter) {
      const interval = setInterval(() => createNewOutput(parameter), 100);
      return () => clearInterval(interval); // Cleanup function to stop interval on unmount
    }
  }, [isRunning, parameter, createNewOutput]);

  // Handle form submission
  const onSubmit: SubmitHandler<Values> = ({ source, rules, changes, scoring }) => {
    const changesArray = parseChanges(changes, '-');
    const phonemeScore = compileScore(scoring);
    const rule = compileRule(rules);

    setOutput([]);
    setParameter({ source, phonemeScore, rule, changesArray });
    setIsRunning(true);
  };

  const outputString = output.map(([word, score]) => `${word}\t${score}`).join('\n').replace(/\./g, ',');

  return (
    <>
      <Head>
        <title>Word Mixer</title>
      </Head>
      <h1>Word Mixer</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-wrap gap-4 lg:gap-6 justify-between">
            <TextArea
              allowTab
              className="w-full max-w-96"
              label="Source"
              name="source"
              defaultValue={source}
              {...textareaProps}
            />
            <TextArea
              allowTab
              className="w-full max-w-96"
              label="Scoring"
              name="scoring"
              defaultValue={scoring}
              {...textareaProps}
            />
          </div>
          <div className="flex flex-wrap gap-4 lg:gap-6 justify-between">
            <TextArea
              allowTab
              className="w-full max-w-96"
              label="Rules"
              name="rules"
              defaultValue={rules}
              {...textareaProps}
            />
            <TextArea
              allowTab
              className="w-full max-w-96"
              label="Changes"
              name="changes"
              defaultValue={changes}
              {...textareaProps}
            />
          </div>
          <input
            type="submit"
            value="Start"
            className="btn btn-primary w-full rounded-md cursor-pointer transition"
          />
          <input
            type="button"
            value="Stop"
            className="btn btn-primary w-full rounded-md cursor-pointer transition"
            onClick={() => setIsRunning(false)}
          />
          <div className="flex flex-wrap gap-4 lg:gap-6 justify-between">
            <TextArea label="Output" className="w-full max-w-96" {...textareaProps} value={outputString} readOnly />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default WordMixer;
