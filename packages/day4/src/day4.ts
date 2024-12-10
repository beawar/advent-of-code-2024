import { readFileInput } from "utils";

export async function readAndParseInputFile(path: string) {
  const result: string[][] = [];
  await readFileInput(path, (line) => {
    result.push(line.split(""));
  });
  return result;
}

const directions = [
  "right",
  "left",
  "top",
  "bottom",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
] as const;

export function findMatches(input: string[][]) {
  return input.reduce((matches, row, y) => {
    row.forEach((char, x) => {
      if (char === "X") {
        const matchChars = ["M", "A", "S"];
        matches += directions.filter((direction) => {
          return isMatch(input, x, y, matchChars, direction);
        }).length;
      }
    });
    return matches;
  }, 0);
}

export function isMatch(
  input: string[][],
  x: number,
  y: number,
  chars: string[],
  direction: (typeof directions)[number],
): boolean {
  if (chars.length === 0) {
    return true;
  }
  let nextX = x;
  let nextY = y;
  switch (direction) {
    case "right":
      nextX += 1;
      break;
    case "left":
      nextX -= 1;
      break;
    case "top":
      nextY -= 1;
      break;
    case "bottom":
      nextY += 1;
      break;
    case "topLeft":
      nextX -= 1;
      nextY -= 1;
      break;
    case "topRight":
      nextX += 1;
      nextY -= 1;
      break;
    case "bottomLeft":
      nextX -= 1;
      nextY += 1;
      break;
    case "bottomRight":
      nextX += 1;
      nextY += 1;
      break;
    default:
      throw new Error(`Unexpected direction`);
  }
  if (
    nextX < input[0].length &&
    nextX >= 0 &&
    nextY < input.length &&
    nextY >= 0
  ) {
    return (
      input[nextY][nextX] === chars[0] &&
      isMatch(input, nextX, nextY, chars.slice(1), direction)
    );
  }
  return false;
}