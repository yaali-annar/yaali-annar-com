"use client";

import TextArea from "@/components/text-area";
import { countCharacterFrequency } from "@/utils/letter-frequency";
import { applyChanges, parseChanges } from "@/utils/sound-change";
import { ChangeEvent, FC, useMemo, useState } from "react";

const textareaProps = {
  className:
    "mt-1 block w-full rounded-md bg-black border border-yellow-300 p-1",
  rows: 20,
  cols: 30,
};

const SoundChange: FC = () => {
  const [changes, setChanges] = useState<string>("");
  const [input, setInput] = useState<string>("");
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
    <main className="flex flex-col items-center justify-center min-h-screen p-2">
      <h1>Sound Changer</h1>
      <div className="flex">
        <div className="p-4">
          <label className="block text-sm font-medium">Changes</label>
          <TextArea
            allowTab
            {...textareaProps}
            value={changes}
            onChange={handleChangesInput}
          />
        </div>
        <div className="p-4">
          <label className="block text-sm font-medium">Input Text</label>
          <TextArea
            allowTab
            {...textareaProps}
            value={input}
            onChange={handleInput}
          />
          <button
            className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={apply}
          >
            Apply
          </button>
        </div>
        <div className="p-4">
          <label className="block text-sm font-medium">Output Text</label>
          <textarea {...textareaProps} value={output} readOnly />
        </div>
        <div className="p-4">
          <label className="block text-sm font-medium">Letter Frequency</label>
          <textarea {...textareaProps} value={frequency} readOnly />
        </div>
      </div>
    </main>
  );
};

export default SoundChange;
