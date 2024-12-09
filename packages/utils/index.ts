import readline from "node:readline/promises";
import fs from "node:fs";

export function readFileInput(
  path: string,
  lineParser: (line: string) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const fileReader = readline.createInterface({
        input: fs.createReadStream(path),
      });
      fileReader.on("line", (input) => {
        lineParser(input);
      });
      fileReader.on("close", () => {
        resolve();
      });
    } catch (err) {
      reject(new Error(`Could not parse input file: ${err}`));
    }
  });
}
