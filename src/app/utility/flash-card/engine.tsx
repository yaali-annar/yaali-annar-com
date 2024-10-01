const getRandomNumbers = (max: number, amount = 3): number[] => {
  const availableNumbers = Array.from({ length: max }, (_, i) => i);
  const selectedNumbers: number[] = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const selected = availableNumbers.splice(randomIndex, 1)[0];
    selectedNumbers.push(selected);
  }

  return selectedNumbers;
};

export { getRandomNumbers }