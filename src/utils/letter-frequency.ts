interface CountOptions {
  wordListMode?: boolean;
  polygraphs?: string[];
}

const countCharacterFrequency = (
  input: string,
  { wordListMode = false, polygraphs = [] }: CountOptions = {}
) => {
  const sortedPolygraphs = [...polygraphs].sort((a, b) => b.length - a.length);
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

  // Count polygraphs
  const countPolygraphs = (lineParam: string, wordFreq: number) => {
    let line = lineParam;
    for (const polygraph of sortedPolygraphs) {
      const polygraphRegex = new RegExp(polygraph, "g");
      const occurrences = (line.match(polygraphRegex) || []).length;

      if (occurrences === 0) {
        continue;
      }

      const count = frequency[polygraph] || 0;
      frequency[polygraph] = count + wordFreq * occurrences;
      line = line.replace(polygraphRegex, "");
    }

    return line;
  };

  // Main processing loop
  for (const line of lines) {
    const { word, wordFreq } = parseLine(line);

    // Count polygraphs and remove them from the line
    const remainingLine = countPolygraphs(word, wordFreq);

    // Count remaining individual characters
    for (const char of remainingLine) {
      frequency[char] = (frequency[char] || 0) + wordFreq;
    }
  }

  return frequency;
};

export { countCharacterFrequency };
