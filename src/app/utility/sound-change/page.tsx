"use client";

import { FormProvider, useForm } from "react-hook-form"
import { useMemo, useState } from "react";

import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form"

import TextArea from "@/components/text-area";
import { countCharacterFrequency } from "@/utils/letter-frequency";
import { applyChanges, parseChanges } from "@/utils/sound-change";

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
  const methods = useForm<Values>()
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
    return Object.entries(characterFrequency)
      .map(([key, value]) => `${key}\t${value}`)
      .join("\n");
  }, [output]);

  console.log({ input: methods.watch("input") })

  return (
    <>
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
          <div className="flex gap-4 lg:gap-6">
            <div>
              <label>Changes</label>
              <TextArea
                allowTab
                defaultValue={defaultValues.input}
                name="input"
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

export default SoundChange;
