"use client";

import TextArea from "@/components/text-area";
import { countCharacterFrequency } from "@/utils/letter-frequency";
import { applyChanges, parseChanges } from "@/utils/sound-change";
import { ChangeEvent, FC, useMemo, useState } from "react";

const textareaProps = {
  rows: 10,
  cols: 50,
};

const defaultInput = `kiki
bobo`;

const defaultChanges = `V=[aeiou]
C=[^aeiou]
(<C>)(<V>)	$2$1`;

const SoundChange: FC = () => {
  const [changes, setChanges] = useState<string>(defaultChanges);
  const [input, setInput] = useState<string>(defaultInput);
  const [output, setOutput] = useState<string>("");

  const handleChangesInput = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setChanges(e.target.value);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  const apply = () => {
    const changesArray = parseChanges(changes);
    const newOutput = input
      .split(/[\n\r]+/)
      .map((line) => applyChanges(line, changesArray))
      .join(`\n`);
    setOutput(newOutput);
  };

  const frequency = useMemo(() => {
    const characterFrequency = countCharacterFrequency(output);
    return Object.entries(characterFrequency)
      .map(([key, value]) => `${key}\t${value}`)
      .join(`\n`);
  }, [output]);

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
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="flex gap-4 lg:gap-6">
          <div>
            <label>Changes</label>
            <TextArea
              allowTab
              {...textareaProps}
              value={changes}
              onChange={handleChangesInput}
            />
          </div>
          <div>
            <label>Input Text</label>
            <TextArea
              allowTab
              {...textareaProps}
              value={input}
              onChange={handleInput}
            />
          </div>
        </div>
        <div>
          <button className="btn btn-primary" onClick={apply}>
            Apply
          </button>
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
      </div>
    </>
  );
};

export default SoundChange;
