"use client";

import { useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";

import TextArea from "@/components/text-area";
import { countCharacterFrequency } from "@/utils/letter-frequency";
import CheckBox from "@/components/check-box";
import TextInput from "@/components/text-input";


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
        Analyze the frequency of each character in your input text. Enter the text
        below and click "Calculate Frequency" to view the result. The output will
        display a list of characters with their respective counts, sorted from most to least frequent.
      </p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-4 lg:gap-6">
            <TextArea
              {...textAreaProps}
              label="Enter text:"
              name="input"
              placeholder="Enter text here"
            />
          </div>
          <div className="flex flex-col gap-4 lg:gap-6">
            <CheckBox name="wordListMode" label="Word list mode" description="Provide a word list with frequency" />
            <TextInput name="polygraphs" label="Polygraphs:" description="Separate with spaces" />
            <input
              type="submit"
              value="Calculate Frequency"
              className="btn btn-primary w-full rounded-md cursor-pointer transition"
            />
            <TextArea
              readOnly
              label="Analysis Output:"
              placeholder="Output here"
              value={output}
              {...textAreaProps}
            />
          </div>
        </form>
      </FormProvider>
    </>

  );
};

export default CharacterFrequency;
