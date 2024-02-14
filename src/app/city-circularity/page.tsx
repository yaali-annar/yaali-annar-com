"use client";

import { MathJax } from "better-react-mathjax";
import { citiesStatistics } from "./data";
import { kebabToProperName } from "@/utils/string";

const CityCircularity = () => {
  return (
    <main>
      <h1>Exploring City Circularity</h1>
      <p>
        Circularity of a shape can be quantified by comparing its circumference
        to its area. However, since area is a two-dimensional measure, we need
        to adjust the dimensionality of the circumference to achieve a
        dimensionless constant.
      </p>
      <p>
        This adjustment is made by squaring the circumference. Let us denote
        circumference as <MathJax inline>\(C\)</MathJax> and area as{" "}
        <MathJax inline>\(A\)</MathJax>. Thus, circularity is defined by the
        formula:
      </p>
      <MathJax>{"$$\\frac{C^2}{A}$$"}</MathJax>
      <p>
        The minimum possible value for circularity, within the Euclidean plane,
        is obtained from a circle:
      </p>
      <MathJax>
        {`$$\\frac{(2\\pi r)^2}{\\pi r^2}=\\frac{4\\pi^2 r^2}{\\pi r^2}=4\\pi \\approx 12.5663$$`}
      </MathJax>
      <p>
        To standardize circularity values, we divide them by{" "}
        <MathJax inline>\(4\pi\)</MathJax>. A result close to 1 indicates a high
        degree of circularity. Below are the circularity values for various
        regular polygons:
      </p>
      <ul className="list-disc ml-4">
        <li>Triangle: 1,6540</li>
        <li>Square: 1,2732</li>
        <li>Pentagon: 1,1566</li>
        <li>Hexagon: 1,1027</li>
      </ul>
      <p>
        Keeping this framework in mind, the following section presents the
        circularity of several cities in Indonesia, listed from the least to the
        most circular. One of the cities scored bellow 1, probably because of
        rounding error or issues in determining the circumference.
      </p>
      <div className="flex flex-wrap gap-2 lg:gap-4 justify-center">
        {citiesStatistics
          .sort((a, b) => b.circularity - a.circularity)
          .map(({ circularity, fileName }, index) => (
            <div key={index}>
              <div className="p-2 rounded bg-white">
                <img src={`/cities/${fileName}.png`} height={128} width={128} />
              </div>
              <p>{kebabToProperName(fileName)}</p>
              <p>{circularity}</p>
            </div>
          ))}
      </div>
    </main>
  );
};

export default CityCircularity;
