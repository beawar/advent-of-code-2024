import {
  getDistinctPositionCount,
  readAndParseInputFile,
  trackPath,
} from "./day6.js";

async function main() {
  const map = await readAndParseInputFile(`${import.meta.dirname}/input`);
  const path = trackPath(map);
  const distinctPositions = getDistinctPositionCount(path);
  return [distinctPositions];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.error(err);
  });
