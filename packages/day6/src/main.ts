import {
  findObstaclePositionsForLoop,
  getDistinctPositionCount,
  readAndParseInputFile,
  trackPath,
} from "./day6.js";

async function main() {
  const map = await readAndParseInputFile(`${import.meta.dirname}/input`);
  const path = trackPath(map);
  const distinctPositions = getDistinctPositionCount(path);
  const positionsForLoop = findObstaclePositionsForLoop(map);
  return [distinctPositions, positionsForLoop];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.error(err);
  });
