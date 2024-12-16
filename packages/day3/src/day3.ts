import { readFileInput } from "utils/src/index.ts";

export async function readAndParseInputFile(path: string) {
  let result = "";
  await readFileInput(path, (line: string) => {
    result += line;
  });
  return result;
}

export function findValidStrings(input: string, withDoAndDonts: boolean) {
  const matches = input.matchAll(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g);
  return matches.reduce<(number[] | boolean)[]>((accumulator, match) => {
    if (match[0] === "do()") {
      if (withDoAndDonts) {
        accumulator.push(true);
      }
    } else if (match[0] === "don't()") {
      if (withDoAndDonts) {
        accumulator.push(false);
      }
    } else {
      accumulator.push(
        match[0]
          .matchAll(/\d+/g)
          .map((numberMatch) => Number(numberMatch[0]))
          .toArray(),
      );
    }
    return accumulator;
  }, []);
}

export function multiplyInstructions(input: (number[] | boolean)[]): number {
  let ignoreNext = false;
  return input.reduce((sum, item) => {
    if (typeof item === "boolean") {
      ignoreNext = !item;
      return sum;
    }
    if (ignoreNext) {
      return sum;
    }
    return sum + item.reduce((prevResult, factor) => prevResult * factor, 1);
  }, 0);
}
