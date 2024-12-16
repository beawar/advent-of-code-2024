import { readAndParseInputFile, sumResultsOfValidEquations } from "./day7.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  const part1 = sumResultsOfValidEquations(input, ["+", "*"]);
  const part2 = sumResultsOfValidEquations(input, ["+", "*", "||"]);
  return [part1, part2];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.log(err);
  });
