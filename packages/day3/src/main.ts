import {
  findValidStrings,
  multiplyInstructions,
  readAndParseInputFile,
} from "./day3.js";

async function main(): Promise<[number]> {
  const initialString = await readAndParseInputFile(
    `${import.meta.dirname}/input`,
  );
  const tuples = findValidStrings(initialString);
  return [multiplyInstructions(tuples)];
}

main().then(console.log).catch(console.error);
