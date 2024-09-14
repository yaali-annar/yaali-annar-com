import { gcd, lcm } from "@/utils/math";

type PhonemeScore = Map<string, number[]>;

// Compile phoneme scores from a string
const compileScore = (scoreString: string): PhonemeScore => {
  const phonemeScoreMap = new Map<string, number[]>();

  for (const line of scoreString.trim().split(/\r?\n/)) {
    const [phoneme, ...vectorString] = line.split(/\t/);
    phonemeScoreMap.set(phoneme, vectorString.map(Number));
  }

  return phonemeScoreMap;
}

// Calculate the score difference between two words based on phoneme scores
const scoreWord = (phonemeScores: PhonemeScore, wordA: string, wordB: string): number => {
  const commonLength = lcm(wordA.length, wordB.length);
  let totalScore = 0;

  for (let i = 0; i < commonLength; i++) {
    const phonemeA = wordA[Math.floor((i * wordA.length) / commonLength)];
    const phonemeB = wordB[Math.floor((i * wordB.length) / commonLength)];

    const scoreA = phonemeScores.get(phonemeA);
    const scoreB = phonemeScores.get(phonemeB);

    if (!scoreA || !scoreB) {
      throw new Error(`Score not found for phoneme: ${!scoreA ? phonemeA : phonemeB}`);
    }

    // Calculate the Euclidean distance between the two phoneme score vectors
    const phonemeDiff = scoreA.reduce((sum, value, index) => {
      const diff = value - scoreB[index];
      return sum + diff ** 2;
    }, 0);

    totalScore += Math.sqrt(phonemeDiff / scoreA.length);
  }

  return totalScore / commonLength;
}

export { compileScore, scoreWord };
export type { PhonemeScore }