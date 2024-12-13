import { readFileInput } from "utils";

export async function readAndParseInputFile(path: string): Promise<string[]> {
  const result: string[] = [];
  await readFileInput(path, (line) => {
    result.push(line);
  });
  return result;
}

export function moveNext(map: string[], from: Position) {
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

export function trackPath(map: string[]): { x: number; y: number }[] {
  let lastPosition: Position = { x: -1, y: -1, direction: "top" };
  const found = map.some((row, y) => {
    const x = row.indexOf("^");
    if (x !== -1) {
      lastPosition.y = y;
      lastPosition.x = x;
      return true;
    }
    return false;
  });
  if (!found) {
    throw new Error(`Could not find guard inside map`);
  }
  const path: { x: number; y: number }[] = [];
  while (lastPosition.x > -1 && lastPosition.y > -1) {
    const nextPosition = moveNext(map, lastPosition);
    if (nextPosition.direction === lastPosition.direction) {
      path.push({ x: lastPosition.x, y: lastPosition.y });
    }
    lastPosition = nextPosition;
  }
  return path;
}

export function getDistinctPositionCount(
  path: Pick<Position, "x" | "y">[],
): number {
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
  }, []).length;
}

interface Position {
  x: number;
  y: number;
  direction: "top" | "right" | "bottom" | "left";
}
