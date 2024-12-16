import { readFileInput } from "utils/src/index.ts";

export async function readAndParseInputFile(path: string) {
  const reports: number[][] = [];
  await readFileInput(path, (line) => {
    reports.push(line.split(/\s+/).map((level) => Number(level)));
  });
  return reports;
}

function checkValues(value: number, nextValue: number, isIncreasing: boolean) {
  const distance = Math.abs(nextValue - value);
  if (distance < 1 || distance > 3) {
    return false;
  }
  if (isIncreasing) {
    return nextValue > value;
  }
  return nextValue < value;
}

export function isSafe(input: number[], tolerance: 0 | 1): boolean {
  if (input.length < 2) {
    return true;
  }

  const [increasing, decreasing] = input.reduce(
    ([increasing, decreasing], value, index) => {
      const nextIndex = index + 1;
      const nextValue = input[nextIndex];
      if (value < nextValue) {
        increasing += 1;
      } else if (value > nextValue) {
        decreasing += 1;
      }
      return [increasing, decreasing];
    },
    [0, 0],
  );

  if (increasing > tolerance && decreasing > tolerance) {
    return false;
  }
  if (increasing + decreasing < input.length - 1 - tolerance) {
    return false;
  }

  return input.some((_, skipIndex) => {
    const inputWithoutFault = input.toSpliced(skipIndex, tolerance);
    return inputWithoutFault.slice(0, -1).every((value, jIndex) => {
      const nextValue = inputWithoutFault[jIndex + 1];
      return checkValues(value, nextValue, increasing > decreasing);
    });
  });
}

export function getNumberOfSafeRecords(
  input: number[][],
  tolerance: 0 | 1,
): number {
  return input.filter((record) => isSafe(record, tolerance)).length;
}
