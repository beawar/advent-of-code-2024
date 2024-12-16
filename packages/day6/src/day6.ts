import { readFileInput } from "utils";

export async function readAndParseInputFile(path: string): Promise<string[]> {
  const result: string[] = [];
  await readFileInput(path, (line) => {
    result.push(line);
  });
  return result;
}

export function moveNext(
  map: string[],
  from: PositionAndDirection,
): PositionAndDirection {
  const to = { ...from };
  switch (from.direction) {
    case "top":
      to.y -= 1;
      break;
    case "right":
      to.x += 1;
      break;
    case "bottom":
      to.y += 1;
      break;
    case "left":
      to.x -= 1;
      break;
    default:
      throw new Error(`Direction not supported`);
  }
  if (to.x < 0 || to.x >= map[0].length) {
    return { ...to, x: -1 };
  }
  if (to.y < 0 || to.y >= map.length) {
    return { ...to, y: -1 };
  }
  if (map[to.y][to.x] === "#") {
    switch (from.direction) {
      case "top":
        to.direction = "right";
        break;
      case "right":
        to.direction = "bottom";
        break;
      case "bottom":
        to.direction = "left";
        break;
      case "left":
        to.direction = "top";
        break;
      default:
        throw new Error(`Direction not supported`);
    }

    return { ...from, direction: to.direction };
  }
  return to;
}

function findInitialPosition(map: string[]): PositionAndDirection {
  let initialPosition: Position | undefined;
  map.some((row, y) => {
    const x = row.indexOf("^");
    if (x !== -1) {
      initialPosition = { x, y };
      return true;
    }
    return false;
  });
  if (!initialPosition) {
    throw new Error(`Could not find guard inside map`);
  }
  return { ...initialPosition, direction: "top" };
}

export function trackPath(map: string[]): Position[] {
  let lastPosition: PositionAndDirection = findInitialPosition(map);
  const path: (Position & { direction?: PositionAndDirection["direction"] })[] =
    [];
  while (lastPosition.x > -1 && lastPosition.y > -1) {
    const nextPosition = moveNext(map, lastPosition);
    if (nextPosition.direction === lastPosition.direction) {
      path.push({ x: lastPosition.x, y: lastPosition.y });
    }
    lastPosition = nextPosition;
  }
  return path;
}

function getDistinctPositions(path: Position[]) {
  return path.reduce<typeof path>((uniqPositions, position) => {
    if (
      !uniqPositions.find(
        (uniqPosition) =>
          uniqPosition.x === position.x && uniqPosition.y === position.y,
      )
    ) {
      uniqPositions.push(position);
    }
    return uniqPositions;
  }, []);
}

export function getDistinctPositionCount(path: Position[]): number {
  return getDistinctPositions(path).length;
}

interface Position {
  x: number;
  y: number;
}

interface PositionAndDirection extends Position {
  direction: "top" | "right" | "bottom" | "left";
}

export function findObstaclePositionsForLoop(map: string[]) {
  const originalPathDistinctPositions = getDistinctPositions(trackPath(map));
  const positionForLoops = originalPathDistinctPositions.filter(
    (newObstaclePosition) => {
      const mapWithObstacle = structuredClone(map);
      if (
        mapWithObstacle[newObstaclePosition.y][newObstaclePosition.x] !== "^"
      ) {
        mapWithObstacle[newObstaclePosition.y] = mapWithObstacle[
          newObstaclePosition.y
        ]
          .split("")
          .toSpliced(newObstaclePosition.x, 1, "#")
          .join("");
      }
      const path: PositionAndDirection[] = [];
      let lastPosition = findInitialPosition(map);
      let foundDuplicatedPosition = false;
      while (
        lastPosition.x > -1 &&
        lastPosition.y > -1 &&
        !foundDuplicatedPosition
      ) {
        const nextPosition = moveNext(mapWithObstacle, lastPosition);
        if (nextPosition.direction === lastPosition.direction) {
          path.push(lastPosition);
        }
        foundDuplicatedPosition = path.some(
          (position) =>
            position.x === nextPosition.x &&
            position.y === nextPosition.y &&
            position.direction === nextPosition.direction,
        );
        lastPosition = nextPosition;
      }
      return foundDuplicatedPosition;
    },
  );
  return positionForLoops.length;
}
