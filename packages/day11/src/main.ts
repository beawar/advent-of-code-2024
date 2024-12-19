import { blink, readAndParseInputFile } from "./day11.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  const part1 = blink(input, 25);
  const part2 = 0;
  return [part1.length, part2];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.log(err);
  });
