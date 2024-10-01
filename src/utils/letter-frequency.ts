interface CountOptions {
  wordListMode?: boolean;
  multigraphs?: string[];
}

const countCharacterFrequency = (
  input: string,
  { wordListMode = false, multigraphs = [] }: CountOptions = {}
) => {
  const sortedMultigraphs = [...multigraphs].sort(
    (a, b) => b.length - a.length
  );
  const frequency: Record<string, number> = {};
  const lines = input.split(/[\n\r+]/);

  // Handle word list mode processing
  const parseLine = (line: string) => {
    if (!wordListMode) {
      return { word: line, wordFreq: 1 };
    }

    const [word, wordFreqString] = line.split("\t");
    return { word, wordFreq: Number(wordFreqString) || 1 };
  };

  // Count multigraphs
  const countMultigraphs = (lineParam: string, wordFreq: number) => {
    let line = lineParam;
    for (const multigraph of sortedMultigraphs) {
      const multigraphRegex = new RegExp(multigraph, "g");
      const occurrences = (line.match(multigraphRegex) || []).length;

      if (occurrences === 0) {
        continue;
      }

      const count = frequency[multigraph] || 0;
      frequency[multigraph] = count + wordFreq * occurrences;
      line = line.replace(multigraphRegex, "");
    }

    return line;
  };

  // Main processing loop
  for (const line of lines) {
    const { word, wordFreq } = parseLine(line);

    // Count multigraphs and remove them from the line
    const remainingLine = countMultigraphs(word, wordFreq);

    // Count remaining individual characters
    for (const char of remainingLine) {
      frequency[char] = (frequency[char] || 0) + wordFreq;
    }
  }

  return frequency;
};

export { countCharacterFrequency };
