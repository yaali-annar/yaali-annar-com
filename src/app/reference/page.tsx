"use client";

import NavBar from "@/components/navbar";
import { createAccessibleProps } from "@/utils/function";
import { classNames } from "@/utils/string";
import { useState } from "react";

const images = ["front", "front-side", "side", "back-side", "back"];

const Reference = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-center bg-black text-yellow-400 w-full min-h-screen p-4">
        <h1>Presenting The Babi</h1>
        <div className="lg:flex">
          <div className="flex mb-4 justify-center lg:flex-col">
            {images.map((image, index) => (
              <button
                {...createAccessibleProps(() => setSelectedIndex(index), ['Enter', ' '])}
                key={image}
                className={classNames('w-1/5 lg:w-full max-w-16 rounded-lg', { 'border-2 border-yellow-400': selectedIndex === index })}
              >
                <img
                  className="max-h-28"
                  src={`/reference/yaali-${image}.png`}
                  alt="the babi"
                />
              </button>
            ))}
          </div>
          <img
            className="w-full max-w-[360px] max-h-[640px] object-contain"
            src={`/reference/yaali-${selectedImage}.png`}
            alt="the babi"
          />
        </div>
      </main>
    </>
  );
};

export default Reference;
