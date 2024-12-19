import { readFileInput } from "utils/src/index.js";

export async function readAndParseInputFile(path: string) {
  const result: number[] = [];
  await readFileInput(path, (line) => {
    result.push(...line.split(/\s+/).map(Number));
  });
  return result;
}

export function transformStone(stone: number) {
  if (stone === 0) {
    return [1];
  }
  if (stone.toString().length % 2 === 0) {
    const stoneString = stone.toString();
    const stoneHalf = stoneString.length / 2;
    return [
      Number(stoneString.slice(0, stoneHalf)),
      Number(stoneString.slice(stoneHalf)),
    ];
  }
  return [stone * 2024];
}

const alreadyProcessed: Record<string, Record<string, number> | undefined> = {};
export function countResultingStonesFromStone(
  stone: number,
  times: number,
): number {
  if (alreadyProcessed[stone]?.[times] !== undefined) {
    return alreadyProcessed[stone][times];
  }
  if (times === 1) {
    return stone.toString().length % 2 === 0 ? 2 : 1;
  }
  const transformed = transformStone(stone);
  return transformed.reduce<number>((sum, stone) => {
    const created = countResultingStonesFromStone(stone, times - 1);
    alreadyProcessed[stone] ??= {};
    alreadyProcessed[stone][times - 1] = created;
    return sum + created;
  }, 0);
}

export function countResultingStones(stones: number[], times: number) {
  return stones.reduce<number>((sum, stone) => {
    return sum + countResultingStonesFromStone(stone, times);
  }, 0);
}
