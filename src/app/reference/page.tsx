"use client";

import NavBar from "@/components/navbar";
import { createAccessibleProps } from "@/utils/function";
import { classNames, kebabToProperName } from "@/utils/string";
import { useState } from "react";
import { palette } from "./constants";
import { hsbToRgb } from "@/utils/colors";
import styles from './reference.module.css'

const images = ["front", "front-side", "side", "back-side", "back"];
const versions = ["clothed", "natural"];

const Reference = () => {
  const [selectedVersion, setSelectedVersion] = useState("clothed")
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-center w-full min-h-screen p-4 gap-8">
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
        <div className="flex flex-col lg:flex-row gap-8">
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
          <div
            className="max-w-[360px] max-h-[640px]"
            style={{ width: 'calc(100vw - 32px)' }}
          >
            <img
              className="object-contain max-w-[360px] max-h-[640px]"
              src={`/reference/yaali-${selectedImage}-${selectedVersion}.webp`}
              alt="the babi"
            />
          </div>
          <div className="space-y-4 text-sm lg:text-base">
            <table className={styles.table}>
              <thead>
                <tr className="text-left">
                  <th>Body Part</th>
                  <th>Color</th>
                  <th>H</th>
                  <th>S</th>
                  <th>B</th>
                </tr>
              </thead>
              <tbody>
                {palette.map(({ description, hsb }) => {
                  const [h, s, br] = hsb
                  const [r, g, b] = hsbToRgb(hsb);
                  return (
                    <tr key={description}>
                      <td>{description}</td>
                      <td>
                        <div className="size-8 rounded" style={{ backgroundColor: `rgb(${r},${g},${b})` }} />
                      </td>
                      <td>{h}</td>
                      <td>{s}</td>
                      <td>{br}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div >
              <p>* Mane, Eyebrow, also Nails</p>
              <p>** Nose, Upper Lip, Palm</p>
              <hr />
              <p>The mascara color are fully saturated:
                <ol className="list-disc pl-4">
                  <li>Red (0°)</li>
                  <li>Yellow (60°)</li>
                  <li>Green (120°)</li>
                  <li>Cyan (180°)</li>
                  <li>Blue (240°)</li>
                  <li>Magenta (300°)</li>
                </ol>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Reference;
