"use client";

import { FormProvider, useForm } from "react-hook-form"
import { useMemo, useState } from "react";

import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form"

import TextArea from "@/components/text-area";
import { countCharacterFrequency } from "@/utils/letter-frequency";
import { applyChanges, parseChanges } from "@/utils/sound-change";
import Select from "@/components/select";
import Head from "next/head";

interface Values {
  input: string,
  changes: string,
  emptyMarker: string,
}

const defaultValues: Values = {
  input: `kiki
bobo`,
  changes: `V=[aeiou]
C=[^aeiou]
(<C>)(<V>)	$2$1`,
  emptyMarker: '-'
}

const textareaProps = {
  rows: 10,
  cols: 50,
};

const SoundChange: FC = () => {
  const methods = useForm<Values>({ defaultValues })
  const [output, setOutput] = useState<string>("");

  const onSubmit: SubmitHandler<Values> = ({ changes, emptyMarker, input }) => {
    const changesArray = parseChanges(changes, emptyMarker);
    const newOutput = input
      .split(/[\n\r]+/)
      .map((line) => applyChanges(line, changesArray))
      .join("\n");
    setOutput(newOutput);
  };

  const frequency = useMemo(() => {
    const characterFrequency = countCharacterFrequency(output);
    const characterFrequencyEntries = Object.entries(characterFrequency)
    characterFrequencyEntries.sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0
    })

    return characterFrequencyEntries
      .map(([key, value]) => `${key}\t${value}`)
      .join("\n");
  }, [output]);

  return (
    <>
      <Head>
        <title>Sound Changer</title>
      </Head>
      <h1>Sound Changer</h1>
      <p>
        This utility allows you to apply a series of sound changes to an input
        text using regular expressions. Enter your sound change rules on the
        left (separated by tab) and the text you wish to transform on the right.
        You can insert &#34;variable&#34; such as V=[aeiou]
      </p>
      <p>
        After applying the changes, the transformed text will be displayed,
        along with a frequency analysis of the characters in the output.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-wrap gap-4 lg:gap-6 justify-between">
            <TextArea
              allowTab
              label="Input"
              name="input"
              defaultValue={defaultValues.input}
              {...textareaProps}
            />
            <TextArea
              allowTab
              label="Changes"
              name="changes"
              defaultValue={defaultValues.changes}
              {...textareaProps}
            />
          </div>

          <Select
            label="Empty Marker"
            name="emptyMarker"
            options={[{ value: '-' }, { value: '0' }]}
          />
          <input
            type="submit"
            value="Apply Changes"
            className="btn btn-primary w-full rounded-md cursor-pointer transition"
          />
          <div className="flex flex-wrap gap-4 lg:gap-6 justify-between">

            <TextArea
              label="Output Text"
              {...textareaProps}
              value={output}
              readOnly
            />

            <TextArea
              label="Letter Frequency"
              {...textareaProps}
              value={frequency}
              readOnly
            />
          </div>
        </form>
      </FormProvider>

    </>
  );
};

export default SoundChange;
