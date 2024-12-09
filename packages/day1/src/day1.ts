import * as fs from "node:fs";
import * as readline from "node:readline/promises";

export function calculateDistance(input1: number[], input2: number[]): number {
  if (input1.length !== input2.length) {
    throw new Error("inputs have different lengths");
  }
  if (input1.length === 0 && input2.length === 0) {
    return 0;
  }
  const sortedInput1 = input1.toSorted((a, b) => a - b);
  const sortedInput2 = input2.toSorted((a, b) => a - b);
  return sortedInput1.reduce<number>((distance, value1, index) => {
    distance += Math.abs(value1 - sortedInput2[index]!);
    return distance;
  }, 0);
}

export function readAndParseInputFile(
  path: string,
): Promise<[number[], number[]]> {
  return new Promise((resolve, reject) => {
    try {
      const inputs: [number[], number[]] = [[], []];
      const fileReader = readline.createInterface({
        input: fs.createReadStream(path),
      });
      fileReader.on("line", (input) => {
        const values = input.split(/\s+/);
        inputs[0].push(Number(values[0]));
        inputs[1].push(Number(values[1]));
      });
      fileReader.on("close", () => {
        resolve(inputs);
      });
    } catch (err) {
      reject(new Error(`Could not parse input file: ${err}`));
    }
  });
}
