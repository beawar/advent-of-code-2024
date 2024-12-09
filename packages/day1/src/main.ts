import { calculateDistance, readAndParseInputFile } from "./day1.js";

async function main(): Promise<number> {
  const [input1, input2] = await readAndParseInputFile(
    `${import.meta.dirname}/input`,
  );
  return calculateDistance(input1, input2);
}

main()
  .then((result) => console.log(result))
  .catch(console.error);
