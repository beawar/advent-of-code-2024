import { readFileInput } from "utils";

export async function readAndParseInputFile(path: string) {
  let result = "";
  await readFileInput(path, (line: string) => {
    result += line;
  });
  return result;
}

export function findValidStrings(input: string): number[][] {
  const matches = input.matchAll(/mul\(\d{1,3},\d{1,3}\)/g);
  return matches
    .map<number[]>((match) => {
      return match[0]
        .matchAll(/\d+/g)
        .map((numberMatch) => Number(numberMatch[0]))
        .toArray();
    })
    .toArray();
}

export function multiplyInstructions(input: number[][]): number {
  return input.reduce((sum, item) => {
    return sum + item.reduce((prevResult, factor) => prevResult * factor, 1);
  }, 0);
}
