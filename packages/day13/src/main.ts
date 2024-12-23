import {
  findMinimumTokensToWinPrizes,
  readAndParseInputFile,
} from "./day13.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  const part1 = findMinimumTokensToWinPrizes(input);
  const part2 = 0;
  return [part1, part2];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.log(err);
  });
