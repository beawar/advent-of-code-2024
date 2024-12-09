import readline from "node:readline/promises";
import fs from "node:fs";

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
