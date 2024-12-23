import {readFileInput} from "utils/src/index.js";

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
      configBlock.buttonA = {x: increments[0], y: increments[1], tokens: 3};
    } else if (line.startsWith("Button B:")) {
      const increments = line
        .replace("Button B:", "")
        .replaceAll(/[XY]/g, "")
        .split(",")
        .map(Number);
      configBlock.buttonB = {x: increments[0], y: increments[1], tokens: 1};
    } else if (line.startsWith("Prize: ")) {
      const coordinates = line
        .replace("Prize: ", "")
        .replaceAll(/[XY]=/g, "")
        .split(",")
        .map(Number);
      configBlock.prize = {x: coordinates[0], y: coordinates[1]};
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

function mcd(a: number, b:number) {
  let aa = a;
  let bb = b;
  while (bb !== 0) {
    let t = bb;
    bb = aa % bb;
    aa = t;
  }
  return aa;
}

function mcm(a: number, b: number) {
  return (a * b) / mcd(a, b);
}

export function findCombination({buttonA, buttonB, prize}: ConfigBlock, limit?: number) {
  let maxPressButtonA = Math.min(
    Math.floor(prize.x / buttonA.x),
    Math.floor(prize.y / buttonA.y),
  );
  let maxPressButtonB = Math.min(
    Math.floor(prize.x / buttonB.x),
    Math.floor(prize.y / buttonB.y),
  );
  if (limit !== undefined) {
    maxPressButtonA = Math.min(maxPressButtonA, limit);
    maxPressButtonB = Math.min(maxPressButtonB, limit);
  }

  let cheapestCombination: Combination | undefined = undefined;

  const mcdX = mcd(buttonA.x, buttonB.x);
  const mcdY = mcd(buttonA.y, buttonB.y);
  const mcmX = mcm(buttonA.x, buttonB.x);
  const mcmY = mcm(buttonA.y, buttonB.y);

 const deltaX = prize.x % buttonA.x
  const mcmDeltaX = mcm(deltaX, buttonB.x)
  const mcmDeltaX2 = mcm(prize.x % buttonB.x, buttonA.x)
  const pressDeltaX = mcmDeltaX / buttonB.x
  const pressDeltaX2 = mcmDeltaX2 / buttonA.x


  for (
    let pressButtonA = maxPressButtonA;
    pressButtonA >= 0;
    pressButtonA--
  ) {
    const diffX = prize.x - (buttonA.x * pressButtonA);
    const diffY = prize.y - (buttonA.y * pressButtonA);
    if ((diffX > 0 && diffX % buttonB.x !== 0) || (diffY > 0 && diffY % buttonB.y !== 0)) {
      continue;
    }
    const pressButtonB = diffX / buttonB.x;

    // for (
    //   let pressButtonB = maxPressButtonB;
    //   pressButtonB > 0;
    //   pressButtonB--
    // ) {
      const x = buttonA.x * pressButtonA + buttonB.x * pressButtonB;
      const y = buttonA.y * pressButtonA + buttonB.y * pressButtonB;
    //   if (x > prize.x || y > prize.y) {
    //     break;
    //   }
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
    // }
  }
  return cheapestCombination;
}

export function findMinimumTokensToWinPrizes(input: ConfigBlock[], limit?: number) {
  return input.reduce(
    (tokens, config) => tokens + (findCombination(config, limit)?.tokens ?? 0),
    0,
  );
}


export function remapPrizePosition(input: ConfigBlock[]) {
  return input.map((config) => ({
    ...config,
    prize: {x: config.prize.x + 10000000000000, y: config.prize.y + 10000000000000}
  }))
}