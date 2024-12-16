import { readAndParseInputFile, sumResultsOfValidEquations } from "./day7.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  return [sumResultsOfValidEquations(input)];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.log(err);
  });
