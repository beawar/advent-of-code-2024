import { countResultingStones, readAndParseInputFile } from "./day11.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  const part1 = countResultingStones(input, 25);
  const part2 = countResultingStones(input, 75);
  return [part1, part2];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.log(err);
  });
