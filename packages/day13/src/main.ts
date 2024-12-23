import {
  findMinimumTokensToWinPrizes,
  readAndParseInputFile, remapPrizePosition,
} from "./day13.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  const part1 = findMinimumTokensToWinPrizes(input, 100);
  const remappedInput = remapPrizePosition(input)
  const part2 = findMinimumTokensToWinPrizes(remappedInput);
  return [part1, part2];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.log(err);
  });
