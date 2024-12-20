import { readFileInput } from "utils/src/index.js";

export async function readAndParseInputFile(path: string) {
  const result: string[] = [];
  await readFileInput(path, (line) => {
    result.push(line);
  });
  return result;
}

interface Position {
  x: number;
  y: number;
}

const directions = ["top", "bottom", "left", "right"] as const;
type Direction = (typeof directions)[number];

export function findRegion(map: string[], from: Position) {
  let lastCheckedPositions: Position[] = [from];
  const region = [from];
  while (lastCheckedPositions.length > 0) {
    const nextPositionsToCheck: Position[] = [];
    lastCheckedPositions.forEach((position) => {
      directions.forEach((direction) => {
        const nextSameRegion = findNextSameRegion(map, position, direction);
        if (nextSameRegion) {
          if (
            !region.some(
              (regionItem) =>
                regionItem.x === nextSameRegion.x &&
                regionItem.y === nextSameRegion.y,
            )
          ) {
            region.push(nextSameRegion);
            nextPositionsToCheck.push(nextSameRegion);
          }
        }
      });
    });
    lastCheckedPositions = nextPositionsToCheck;
  }
  return region;
}

export function findNextSameRegion(
  map: string[],
  from: Position,
  direction: Direction,
) {
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
      throw new Error("Unsupported direction");
  }
  if (
    next.x >= 0 &&
    next.y >= 0 &&
    next.x < map[0].length &&
    next.y < map.length &&
    map[next.y][next.x] === map[from.y][from.x]
  ) {
    return next;
  }
  return undefined;
}

export function calcArea(region: Position[]) {
  return region.length;
}

export function calcPerimeter(map: string[], region: Position[]) {
  return region.reduce((totalPerimeter, position) => {
    return totalPerimeter + getPerimeterForPosition(map, position, region);
  }, 0);
}

export function getPerimeterForPosition(
  map: string[],
  position: Position,
  region: Position[],
) {
  return directions.reduce<number>((perimeter, direction) => {
    const next = { ...position };
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
        throw new Error("Unsupported direction");
    }
    if (
      next.x < 0 ||
      next.y < 0 ||
      next.x >= map[0].length ||
      next.y >= map.length ||
      !region.some(
        (regionItem) => regionItem.x === next.x && regionItem.y === next.y,
      )
    ) {
      return perimeter + 1;
    }
    return perimeter;
  }, 0);
}

export function findDistinctRegions(map: string[]) {
  const regions: Position[][] = [];
  const coveredMap = map.map((row) => Array<boolean>(row.length).fill(false));
  coveredMap.forEach((row, y) => {
    row.forEach((positionIsChecked, x) => {
      if (!positionIsChecked) {
        const region = findRegion(map, { x, y });
        regions.push(region);
        region.forEach((regionItem) => {
          coveredMap[regionItem.y][regionItem.x] = true;
        });
      }
    });
  });
  return regions;
}

export function calcTotalPriceFromMap(map: string[]) {
  const regions = findDistinctRegions(map);
  return regions.reduce((totalPrice, region) => {
    return totalPrice + calcArea(region) * calcPerimeter(map, region);
  }, 0);
}
