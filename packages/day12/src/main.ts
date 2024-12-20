import {
  calcPriceAreaPerPerimeterFromMap,
  calcPriceAreaPerSidesFromMap,
  readAndParseInputFile,
} from "./day12.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  const part1 = calcPriceAreaPerPerimeterFromMap(input);
  const part2 = calcPriceAreaPerSidesFromMap(input);
  return [part1, part2];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.log(err);
  });
