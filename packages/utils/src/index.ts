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
    } catch (err: unknown) {
      if (typeof err === "string") {
        reject(new Error(err));
      } else if (err instanceof Error) {
        reject(err);
      } else {
        reject(new Error(`Cannot read file ${path}`));
      }
    }
  });
}
