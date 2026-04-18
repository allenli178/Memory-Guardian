export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateCardPairs(icons: string[], count: number): string[] {
  const selectedIcons = icons.slice(0, count);
  const pairs = [...selectedIcons, ...selectedIcons];
  return shuffleArray(pairs);
}

export function calculateStars(moves: number, pairs: number): number {
  const perfectMoves = pairs;
  const goodMoves = pairs * 1.5;
  const okayMoves = pairs * 2;

  if (moves <= perfectMoves) return 3;
  if (moves <= goodMoves) return 2;
  if (moves <= okayMoves) return 1;
  return 1;
}

export function generateRandomNumbers(count: number): number[] {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * 9) + 1);
  }
  return numbers;
}

export function generateColorChallenge(colors: { name: string; value: string }[]) {
  const colorIndex = Math.floor(Math.random() * colors.length);
  const textIndex = Math.floor(Math.random() * colors.length);

  return {
    text: colors[textIndex].name,
    textColor: colors[colorIndex].value,
    correctColor: colors[colorIndex].value,
    options: shuffleArray(colors.map((c) => c.value)),
  };
}
