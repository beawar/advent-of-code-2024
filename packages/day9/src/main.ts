import {
  calcChecksum,
  createFileBlocks,
  createSpaceBlocks,
  mergeBlocks,
  mergeBlocksNoBreak,
  readAndParseInputFile,
} from "./day9.js";

async function main() {
  const input = await readAndParseInputFile(`${import.meta.dirname}/input`);
  const fileBlocks = createFileBlocks(input);
  const spaceBlocks = createSpaceBlocks(input);
  const mergedBlocks = mergeBlocks(fileBlocks, spaceBlocks);
  const part1 = calcChecksum(mergedBlocks);
  const mergedBlocksNoBreak = mergeBlocksNoBreak(fileBlocks, spaceBlocks);
  const part2 = calcChecksum(mergedBlocksNoBreak);
  return [part1, part2];
}

main()
  .then(console.log)
  .catch((err: unknown) => {
    console.log(err);
  });
