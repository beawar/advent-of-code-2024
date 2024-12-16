import { readFileInput } from "utils/src/index.js";

interface Position {
  x: number;
  y: number;
}

export async function readAndParseInputFile(path: string) {
  const result: string[] = [];
  await readFileInput(path, (line) => {
    result.push(line);
  });
  return result;
}

export function calcAntinodesForAntennas(antennas: Position[]): Position[] {
  const antinodes: Position[] = [];
  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      const antenna1 = antennas[i];
      const antenna2 = antennas[j];
      const deltaY1 = antenna1.y - antenna2.y;
      const deltaX1 = antenna1.x - antenna2.x;
      const deltaY2 = antenna2.y - antenna1.y;
      const deltaX2 = antenna2.x - antenna1.x;
      antinodes.push(
        { x: antenna1.x + deltaX1, y: antenna1.y + deltaY1 },
        { x: antenna2.x + deltaX2, y: antenna2.y + deltaY2 },
      );
    }
  }

  return antinodes;
}

export function getAntennasByFrequency(
  map: string[],
): Record<string, Position[]> {
  return map.reduce<Record<string, Position[]>>((result, row, y) => {
    row.matchAll(/[a-zA-Z0-9]/g).forEach((match) => {
      result[match[0]] ??= [];
      result[match[0]].push({ x: match.index, y });
    });
    return result;
  }, {});
}

export function filterValidUniqAntinodesForAntennas(
  antinodes: Position[],
  map: string[],
) {
  return antinodes.reduce<Position[]>((result, node) => {
    if (
      node.x >= 0 &&
      node.y >= 0 &&
      node.x < map[0].length &&
      node.y < map.length &&
      !result.some((item) => item.x === node.x && item.y === node.y)
    ) {
      result.push(node);
    }
    return result;
  }, []);
}

export function getUniqAntinodesCountFromMap(map: string[]) {
  const antennas = getAntennasByFrequency(map);
  const allAntinodes = Object.values(antennas).flatMap((group) =>
    calcAntinodesForAntennas(group),
  );
  return filterValidUniqAntinodesForAntennas(allAntinodes, map).length;
}
