import {
  findValidStrings,
  multiplyInstructions,
  readAndParseInputFile,
} from "./day3.js";

async function main(): Promise<[number, number]> {
  const initialString = await readAndParseInputFile(
    `${import.meta.dirname}/input`,
  );
  const part1Tuples = findValidStrings(initialString, false);
  const part2Tuples = findValidStrings(initialString, true);
  return [multiplyInstructions(part1Tuples), multiplyInstructions(part2Tuples)];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.error(err);
  });
