const countCharacterFrequency = (input: string) => {
  const frequency: Record<string, number> = {};
  for (let char of input) {
    const count = frequency[char];
    frequency[char] = count ? count + 1 : 1;
  }
  return frequency;
};

export { countCharacterFrequency };
