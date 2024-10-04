import type { FC, ReactNode } from "react";

interface GlossProps {
  children: string;
}

const Gloss: FC<GlossProps> = ({ children }) => {
  const lines = children.split(/[\n\r]+/).filter((line) => line);
  const processedLines: ReactNode[] = [];

  let glossLines: string[][] = [];

  const processGlossLines = () => {
    if (!glossLines.length) {
      return;
    }

    const glossContent = glossLines[0].map((morpheme, i) => (
      <div key={morpheme}>
        {glossLines.map((line) => (
          <div key={line[i]}>{line[i]}</div>
        ))}
      </div>
    ));

    processedLines.push(
      <div
        className="flex flex-wrap gap-2 lg:gap-4"
        key={`flex-${processedLines.length}`}
      >
        {glossContent}
      </div>
    );

    glossLines = [];
  };

  for (const line of lines) {
    if (line.startsWith("@")) {
      glossLines.push(line.slice(1).trim().split(/ +/));
      continue;
    }
    processGlossLines();
    processedLines.push(<p key={line}>{line}</p>);
  }

  processGlossLines();

  return (
    <div className="inline-flex flex-col gap-2 lg:gap-3 border border-yellow-400 rounded p-2 lg:p-4 max-w-full overflow-x-auto">
      {processedLines}
    </div>
  );
};

export default Gloss;
