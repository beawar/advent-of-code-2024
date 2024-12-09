import { getNumberOfSafeRecords, readAndParseInputFile } from "./day2.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  return [getNumberOfSafeRecords(input)];
}

main().then(console.log).catch(console.error);
