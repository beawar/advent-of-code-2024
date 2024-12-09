import {
  calculateDistance,
  calculateSimilarityScore,
  readAndParseInputFile,
} from "./day1.js";

async function main(): Promise<[number, number]> {
  const [input1, input2] = await readAndParseInputFile(
    `${import.meta.dirname}/input`,
  );
  const part1 = calculateDistance(input1, input2);
  const part2 = calculateSimilarityScore(input1, input2);
  return [part1, part2];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.error(err);
  });
