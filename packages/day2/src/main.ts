import { getNumberOfSafeRecords, readAndParseInputFile } from "./day2.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  return [getNumberOfSafeRecords(input, 0), getNumberOfSafeRecords(input, 1)];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.error(err);
  });
