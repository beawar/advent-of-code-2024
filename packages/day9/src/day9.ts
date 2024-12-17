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

export function calcChecksum(input: (number | ".")[]) {
  return input.reduce<number>((sum, value, index) => {
    if (value !== ".") {
      return sum + value * index;
    }
    return sum;
  }, 0);
}

export function mergeBlocksNoBreak(files: number[], spaces: number[]) {
  const result = files.reduce<(number | ".")[]>((res, length, index) => {
    res.push(...Array<number>(length).fill(index));
    if (index < spaces.length) {
      res.push(...Array<".">(spaces[index]).fill("."));
    }
    return res;
  }, []);

  let index = result.length - 1;
  let prevValueToMove: number = files.length;
  while (index > 0) {
    const valueToMove = result[index];
    if (valueToMove === ".") {
      index -= 1;
      continue;
    }
    const from = result.indexOf(valueToMove);
    const length = index - from + 1;

    if (valueToMove > prevValueToMove) {
      index -= length;
      continue;
    }

    prevValueToMove = valueToMove;
    const spaceSlots = Array<".">(length).fill(".");
    const firstAvailableSpot = result.findIndex((value, index) => {
      return (
        value === "." &&
        result.slice(index, index + length).every((item) => item === ".")
      );
    });
    if (firstAvailableSpot !== -1 && firstAvailableSpot < from) {
      result.splice(
        firstAvailableSpot,
        length,
        ...result.splice(from, length, ...spaceSlots),
      );
    }

    index -= length;
  }

  return result;
}
