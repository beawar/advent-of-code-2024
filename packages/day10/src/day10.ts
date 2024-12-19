import { readFileInput } from "utils/src/index.js";

export async function readAndParseInputFile(path: string) {
  const result: number[][] = [];
  await readFileInput(path, (line) => {
    result.push(line.split("").map(Number));
  });
  return result;
}

interface Position {
  x: number;
  y: number;
}

const directions = ["top", "bottom", "left", "right"] as const;
type Direction = (typeof directions)[number];

export function findScoreOfTrailhead(
  map: number[][],
  initialPosition: Position,
) {
  const validPaths = findTrailPaths(map, initialPosition);
  return validPaths.reduce((uniqDestinations, path) => {
    const destination = path[path.length - 1];
    if (
      !uniqDestinations.some(
        (item) => item.x === destination.x && item.y === destination.y,
      )
    ) {
      uniqDestinations.push(destination);
    }
    return uniqDestinations;
  }, []).length;
}

export function findTrailPaths(map: number[][], initialPosition: Position) {
  let paths: Position[][] = [[initialPosition]];
  let currentHeight = 0;
  while (currentHeight < 9) {
    const nextPaths: Position[][] = [];
    for (const path of paths) {
      if (currentHeight === path.length - 1) {
        const validNextSteps = findNextSteps(map, path[currentHeight]);
        nextPaths.push(
          ...validNextSteps.map((nextStep) => [...path, nextStep]),
        );
      }
    }
    currentHeight += 1;
    paths = [...nextPaths];
  }
  return paths;
}

export function findNextSteps(map: number[][], from: Position) {
  return directions.reduce<Position[]>((validNextSteps, direction) => {
    const nextStep = getNextIfValid(map, from, direction);
    if (nextStep) {
      validNextSteps.push(nextStep);
    }
    return validNextSteps;
  }, []);
}

function getNextIfValid(map: number[][], from: Position, direction: Direction) {
  const next = { ...from };
  switch (direction) {
    case "top":
      next.y -= 1;
      break;
    case "bottom":
      next.y += 1;
      break;
    case "left":
      next.x -= 1;
      break;
    case "right":
      next.x += 1;
      break;
    default:
      throw new Error("Invalid direction");
  }

  if (
    next.x >= 0 &&
    next.x < map[0].length &&
    next.y >= 0 &&
    next.y < map.length &&
    map[next.y][next.x] === map[from.y][from.x] + 1
  ) {
    return next;
  }
  return false;
}

export function sumTrailheadScores(map: number[][]) {
  let sum = 0;
  map.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 0) {
        sum += findScoreOfTrailhead(map, { x, y });
      }
    });
  });
  return sum;
}

export function findTrailheadRating(
  map: number[][],
  initialPosition: Position,
) {
  return findTrailPaths(map, initialPosition).length;
}

export function sumTrailheadRatings(map: number[][]) {
  let sum = 0;
  map.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 0) {
        sum += findTrailheadRating(map, { x, y });
      }
    });
  });
  return sum;
}
