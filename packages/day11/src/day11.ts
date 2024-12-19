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
    const stoneHalf = stone.toString().length / 2;
    return [
      Number(stone.toString().slice(0, stoneHalf)),
      Number(stone.toString().slice(stoneHalf)),
    ];
  }
  return [stone * 2024];
}

export function blink(stones: number[], times: number) {
  let result = stones;
  for (let i = 0; i < times; i++) {
    result = result.flatMap(transformStone);
  }
  return result;
}
