import {
  getUniqAntinodesCountFromMap,
  getUniqAntinodesCountFromMapWithoutDistanceLimit,
  readAndParseInputFile,
} from "./day8.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  const part1 = getUniqAntinodesCountFromMap(input);
  const part2 = getUniqAntinodesCountFromMapWithoutDistanceLimit(input);
  return [part1, part2];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.log(err);
  });
