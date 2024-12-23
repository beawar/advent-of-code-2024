import { readFileInput } from "utils/src/index.js";

interface Button {
  x: number;
  y: number;
  tokens: number;
}
interface Position {
  x: number;
  y: number;
}

interface ConfigBlock {
  buttonA: Button;
  buttonB: Button;
  prize: Position;
}
export async function readAndParseInputFile(path: string) {
  const result: ConfigBlock[] = [];
  let configBlock: Partial<ConfigBlock> | undefined;
  await readFileInput(path, (line) => {
    configBlock ??= {};
    if (line.startsWith("Button A:")) {
      const increments = line
        .replace("Button A:", "")
        .replaceAll(/[XY]/g, "")
        .split(",")
        .map(Number);
      configBlock.buttonA = { x: increments[0], y: increments[1], tokens: 3 };
    } else if (line.startsWith("Button B:")) {
      const increments = line
        .replace("Button B:", "")
        .replaceAll(/[XY]/g, "")
        .split(",")
        .map(Number);
      configBlock.buttonB = { x: increments[0], y: increments[1], tokens: 1 };
    } else if (line.startsWith("Prize: ")) {
      const coordinates = line
        .replace("Prize: ", "")
        .replaceAll(/[XY]=/g, "")
        .split(",")
        .map(Number);
      configBlock.prize = { x: coordinates[0], y: coordinates[1] };
    } else {
      result.push(structuredClone(configBlock as ConfigBlock));
      configBlock = undefined;
    }
  });
  if (configBlock) {
    result.push(structuredClone(configBlock as ConfigBlock));
  }
  return result;
}

interface Combination {
  buttonA: number;
  buttonB: number;
  tokens: number;
}
export function findCombination({ buttonA, buttonB, prize }: ConfigBlock) {
  const maxPressButtonA = Math.min(
    Math.floor(prize.x / buttonA.x),
    Math.floor(prize.y / buttonA.y),
    100,
  );
  const maxPressButtonB = Math.min(
    Math.floor(prize.x / buttonB.x),
    Math.floor(prize.y / buttonB.y),
    100,
  );

  let cheapestCombination: Combination | undefined = undefined;

  for (
    let pressButtonA = 0;
    pressButtonA < maxPressButtonA + 1;
    pressButtonA++
  ) {
    for (
      let pressButtonB = 0;
      pressButtonB < maxPressButtonB + 1;
      pressButtonB++
    ) {
      const x = buttonA.x * pressButtonA + buttonB.x * pressButtonB;
      const y = buttonA.y * pressButtonA + buttonB.y * pressButtonB;
      const tokens =
        buttonA.tokens * pressButtonA + buttonB.tokens * pressButtonB;
      if (
        x === prize.x &&
        y === prize.y &&
        (!cheapestCombination || cheapestCombination.tokens > tokens)
      ) {
        cheapestCombination = {
          buttonA: pressButtonA,
          buttonB: pressButtonB,
          tokens,
        };
      }
    }
  }
  return cheapestCombination;
}

export function findMinimumTokensToWinPrizes(input: ConfigBlock[]) {
  return input.reduce(
    (tokens, config) => tokens + (findCombination(config)?.tokens ?? 0),
    0,
  );
}
