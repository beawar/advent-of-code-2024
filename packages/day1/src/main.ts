import { calculateDistance, calculateSimilarityScore } from "./day1.js";
import { readAndParseInputFile } from "./utils.js";

async function main(): Promise<[number, number]> {
  const [input1, input2] = await readAndParseInputFile(
    `${import.meta.dirname}/input`,
  );
  const part1 = calculateDistance(input1, input2);
  const part2 = calculateSimilarityScore(input1, input2);
  return [part1, part2];
}

main()
  .then((result) => console.log(result))
  .catch(console.error);
