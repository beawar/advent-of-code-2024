import {readFileInput} from "utils/src/index.ts";

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

  

  let diffBX = prize.x - (buttonB.x * maxPressButtonB);
  let diffBY = prize.y - (buttonB.y * maxPressButtonB);
  let minPressButtonA = Math.ceil(Math.max(diffBX / buttonA.x, diffBY / buttonA.y));
  let diffAX = prize.x - (buttonA.x * maxPressButtonA);
  let diffAY = prize.y - (buttonA.y * maxPressButtonA);
  let minPressButtonB = Math.ceil(Math.max(diffAX / buttonB.x, diffAY / buttonB.y));

  while (maxPressButtonA > minPressButtonA && maxPressButtonB > minPressButtonB) {
    maxPressButtonB = Math.floor(Math.min((prize.x - (buttonA.x * minPressButtonA)) / buttonB.x, (prize.y - (buttonA.y * minPressButtonA)) / buttonB.y));
    maxPressButtonA = Math.floor(Math.min((prize.x - (buttonB.x * minPressButtonB)) / buttonA.x, (prize.y - (buttonB.y * minPressButtonB)) / buttonA.y));
    
    diffBX = prize.x - (buttonB.x * maxPressButtonB);
    diffBY = prize.y - (buttonB.y * maxPressButtonB);
    minPressButtonA = Math.ceil(Math.max(diffBX / buttonA.x, diffBY / buttonA.y));
    diffAX = prize.x - (buttonA.x * maxPressButtonA);
    diffAY = prize.y - (buttonA.y * maxPressButtonA);
    minPressButtonB = Math.ceil(Math.max(diffAX / buttonB.x, diffAY / buttonB.y));
  }


  // prizeX = (buttonA.x * pressButtonA) + (buttonB.x * pressButtonB)
  // prizeX = (buttonA.x * pressButtonA) + restA
  // prizeX = (buttonB.x * pressButtonB) + restB
  
  let pressButtonA = maxPressButtonA;
  let pressButtonB = maxPressButtonB;

  while (
    pressButtonB >= minPressButtonB
  ) {
    const diffX = prize.x - (buttonB.x * pressButtonB);
    const diffY = prize.y - (buttonB.y * pressButtonB);
    if ((diffX > 0 && diffX % buttonB.x !== 0) || (diffY > 0 && diffY % buttonB.y !== 0)) {
      

      pressButtonB--;
      continue;
    }
    const pressButtonA = diffX / buttonA.x;

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
    pressButtonB--;
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