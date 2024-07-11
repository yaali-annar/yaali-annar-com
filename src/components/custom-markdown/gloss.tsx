import { FC, ReactNode } from "react";

interface GlossProps {
  children: string;
}

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

    const glossContent = glossLines[0].map((_, i) => (
      <div key={i}>
        {glossLines.map((line, j) => (
          <div key={`${j}-${i}`} className="text-center">
            {line[i]}
          </div>
        ))}
      </div>
    ));

    processedLines.push(
      <div
        className="flex gap-2 lg:gap-4"
        key={`flex-${processedLines.length}`}
      >
        {glossContent}
      </div>
    );

    glossLines = [];
  };

  lines.forEach((line, index) => {
    if (line.startsWith("@")) {
      glossLines.push(line.slice(1).trim().split(/ +/));
      return;
    }
    processGlossLines();
    processedLines.push(<p key={index}>{line}</p>);
  });

  processGlossLines();

  return (
    <div className="inline-flex flex-col gap-2 lg:gap-3 border border-yellow-400 rounded p-2 lg:p-4 max-w-full overflow-x-auto">
      {processedLines}
    </div>
  );
};

export default Gloss;
