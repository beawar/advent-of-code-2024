import { readFileInput } from "utils";

export async function readAndParseInputFile(path: string) {
  const reports: number[][] = [];
  await readFileInput(path, (line) => {
    reports.push(line.split(/\s+/).map((level) => Number(level)));
  });
  return reports;
}

export function isSafe(input: number[]): boolean {
  if (input.length < 2) {
    return true;
  }
  const isIncreasing = input[0] < input[1];
  return input.every((value, index) => {
    if (index === 0) {
      return true;
    }

    const prevValue = input[index - 1];
    const distance = Math.abs(value - prevValue);
    if (distance < 1 || distance > 3) {
      return false;
    }
    if (isIncreasing) {
      return value > prevValue;
    }
    return value < prevValue;
  });
}

export function getNumberOfSafeRecords(input: number[][]): number {
  return input.filter((record) => isSafe(record)).length;
}
