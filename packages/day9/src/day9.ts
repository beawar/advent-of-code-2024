import { readFileInput } from "utils/src/index.js";

export async function readAndParseInputFile(path: string) {
  let result = "";
  await readFileInput(path, (line) => {
    result += line;
  });
  return result;
}

export function createFileBlocks(input: string) {
  const blocks: number[] = [];
  for (let i = 0; i < input.length; i += 2) {
    blocks.push(Number(input[i]));
  }
  return blocks;
}

export function createSpaceBlocks(input: string) {
  const blocks: number[] = [];
  for (let i = 1; i < input.length; i += 2) {
    blocks.push(Number(input[i]));
  }
  return blocks;
}

export function mergeBlocks(files: number[], spaces: number[]) {
  const result = Array<number>(files[0]).fill(0);
  const flatFiles = files
    .slice(1)
    .flatMap((length, index) => Array<number>(length).fill(index + 1));
  for (let i = 0; i < spaces.length && flatFiles.length > 0; i++) {
    const spaceSlot = spaces[i];
    result.push(...flatFiles.splice(spaceSlot * -1, spaceSlot).toReversed());
    result.push(...flatFiles.splice(0, files[i + 1]));
  }
  return result;
}

export function calcChecksum(input: number[]) {
  return input.reduce((sum, value, index) => sum + value * index, 0);
}
