import {
  findCrossMatches,
  findMatches,
  readAndParseInputFile,
} from "./day4.js";

async function main(): Promise<number[]> {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  return [findMatches(input), findCrossMatches(input)];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.error(err);
  });
