"use client";

import { useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";

import TextArea from "@/components/text-area";
import { countCharacterFrequency } from "@/utils/letter-frequency";


interface Values {
  input: string,
  wordListMode: boolean,
  polygraphs: string
}

const textAreaProps = { cols: 40, rows: 20 }

const CharacterFrequency = () => {
  const methods = useForm<Values>()

  const [output, setOutput] = useState<string>("");

  const onSubmit: SubmitHandler<Values> = ({ input, wordListMode, polygraphs }) => {
    console.log({ wordListMode })
    const frequency = countCharacterFrequency(input, { wordListMode, polygraphs: polygraphs.split(/ +/) });

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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <TextArea
            {...textAreaProps}
            placeholder="Enter text here"
            name="input" />
          <div className="flex flex-col gap-2 lg:gap-4">
            <div className="flex items-center gap-2 lg:gap-4">
              <input type="checkbox" className="size-4" {...methods.register('wordListMode')} />
              <label>Word list mode (Provide a word list with frequency)</label>
            </div>
            <div className="flex flex-col gap-2 lg:gap-4">
              <label>Polygraphs (Separate polygraphs with space)</label>
              <input type="text" {...methods.register('polygraphs')} />

            </div>
            <input type="submit"
              className="btn btn-primary"
            />
          </div>
          <TextArea
            readOnly
            placeholder="Output here"
            {...textAreaProps}
            value={output}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default CharacterFrequency;
