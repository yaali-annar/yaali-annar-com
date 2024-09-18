"use client";

import NavBar from "@/components/navbar";
import { createAccessibleProps } from "@/utils/function";
import { classNames, kebabToProperName } from "@/utils/string";
import { useState } from "react";

const images = ["front", "front-side", "side", "back-side", "back"];
const versions = ["clothed", "natural"];

const Reference = () => {
  const [selectedVersion, setSelectedVersion] = useState("clothed")
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-center w-full min-h-screen p-4 gap-4 lg:gap-6">
        <h1>Presenting The Babi</h1>
        <div className="flex justify-center gap-2">
          {versions.map(version => <button
            {...createAccessibleProps(() => setSelectedVersion(version), ['Enter', ' '])}

            key={version}
            className={classNames('rounded-full px-2', {
              'bg-yellow-400 text-black': selectedVersion === version,
              'border border-yellow-400': selectedVersion === version
            })}

          >{kebabToProperName(version)}</button>)}
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex mb-4 justify-center lg:flex-col">
            {images.map((image, index) => (
              <button
                {...createAccessibleProps(() => setSelectedIndex(index), ['Enter', ' '])}
                key={image}
                className={classNames('border-2 w-1/5 lg:w-full lg:h-1/5 rounded-lg p-1 flex justify-center items-center', {
                  'border-yellow-400': selectedIndex === index,
                  'border-black': selectedIndex !== index
                })}
              >
                <img
                  className="max-h-28 object-contain"
                  src={`/reference/yaali-${image}-${selectedVersion}.webp`}
                  alt="the babi"
                />
              </button>
            ))}
          </div>
          <div className="max-w-[360px] max-h-[640px]"
            style={{ width: 'calc(100vw - 32px)' }}
          >
            <img
              className="object-contain max-w-[360px] max-h-[640px]"
              src={`/reference/yaali-${selectedImage}-${selectedVersion}.webp`}
              alt="the babi"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Reference;
