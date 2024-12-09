export function calculateDistance(input1: number[], input2: number[]): number {
  if (input1.length !== input2.length) {
    throw new Error("inputs have different lengths");
  }
  if (input1.length === 0 && input2.length === 0) {
    return 0;
  }
  const sortedInput1 = input1.toSorted((a, b) => a - b);
  const sortedInput2 = input2.toSorted((a, b) => a - b);
  return sortedInput1.reduce<number>((distance, value1, index) => {
    distance += Math.abs(value1 - sortedInput2[index]!);
    return distance;
  }, 0);
}

export function calculateSimilarityScore(
  input1: number[],
  input2: number[],
): number {
  if (input1.length !== input2.length) {
    throw new Error("inputs have different lengths");
  }
  if (input1.length === 0 && input2.length === 0) {
    return 0;
  }
  const sortedInput2 = input2.toSorted((a, b) => a - b);
  return input1.reduce((accumulator, value) => {
    const firstIndex = sortedInput2.findIndex((item) => item === value);
    if (firstIndex >= 0) {
      const values = sortedInput2.slice(
        firstIndex,
        sortedInput2.findLastIndex((item) => item === value) + 1,
      );
      accumulator += value * values.length;
    }
    return accumulator;
  }, 0);
}
