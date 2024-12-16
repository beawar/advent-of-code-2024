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

export function calcAntinodesForAntennas(
  antennas: Position[],
  { maxX, maxY }: { maxX: number; maxY: number },
): Position[] {
  const antinodes: Position[] = [];
  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      const antenna1 = antennas[i];
      const antenna2 = antennas[j];
      const deltaY1 = antenna1.y - antenna2.y;
      const deltaX1 = antenna1.x - antenna2.x;
      const deltaY2 = antenna2.y - antenna1.y;
      const deltaX2 = antenna2.x - antenna1.x;
      if (
        antenna1.x + deltaX1 >= 0 &&
        antenna1.x + deltaX1 < maxX &&
        antenna1.y + deltaY1 >= 0 &&
        antenna1.y + deltaY1 < maxY
      ) {
        antinodes.push({ x: antenna1.x + deltaX1, y: antenna1.y + deltaY1 });
      }
      if (
        antenna2.x + deltaX2 >= 0 &&
        antenna2.x + deltaX2 < maxX &&
        antenna2.y + deltaY2 >= 0 &&
        antenna2.y + deltaY2 < maxY
      ) {
        antinodes.push({ x: antenna2.x + deltaX2, y: antenna2.y + deltaY2 });
      }
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

export function filterUniqAntinodesForAntennas(antinodes: Position[]) {
  return antinodes.reduce<Position[]>((result, node) => {
    if (!result.some((item) => item.x === node.x && item.y === node.y)) {
      result.push(node);
    }
    return result;
  }, []);
}

export function getUniqAntinodesCountFromMap(map: string[]) {
  const antennas = getAntennasByFrequency(map);
  const allAntinodes = Object.values(antennas).flatMap((group) =>
    calcAntinodesForAntennas(group, { maxX: map[0].length, maxY: map.length }),
  );
  return filterUniqAntinodesForAntennas(allAntinodes).length;
}

function calcAllAntinodesForAntenna(
  antenna: Position,
  {
    maxY,
    maxX,
    deltaX,
    deltaY,
  }: { maxX: number; maxY: number; deltaX: number; deltaY: number },
) {
  const antinodes: Position[] = [];
  let factor = 1;
  while (
    antenna.x + deltaX * factor >= 0 &&
    antenna.x + deltaX * factor < maxX &&
    antenna.y + deltaY * factor >= 0 &&
    antenna.y + deltaY * factor < maxY
  ) {
    antinodes.push({
      x: antenna.x + deltaX * factor,
      y: antenna.y + deltaY * factor,
    });
    factor += 1;
  }
  return antinodes;
}

export function calcAntinodesForAntennasWithoutDistanceLimit(
  antennas: Position[],
  { maxX, maxY }: { maxX: number; maxY: number },
): Position[] {
  const antinodes: Position[] = [];
  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      const antenna1 = antennas[i];
      const antenna2 = antennas[j];
      antinodes.push(antenna1);
      antinodes.push(antenna2);
      antinodes.push(
        ...calcAllAntinodesForAntenna(antenna1, {
          maxX,
          maxY,
          deltaX: antenna1.x - antenna2.x,
          deltaY: antenna1.y - antenna2.y,
        }),
      );

      antinodes.push(
        ...calcAllAntinodesForAntenna(antenna2, {
          maxX,
          maxY,
          deltaX: antenna2.x - antenna1.x,
          deltaY: antenna2.y - antenna1.y,
        }),
      );
    }
  }

  return antinodes;
}

export function getUniqAntinodesCountFromMapWithoutDistanceLimit(
  map: string[],
) {
  const antennas = getAntennasByFrequency(map);
  const allAntinodes = Object.values(antennas).flatMap((group) =>
    calcAntinodesForAntennasWithoutDistanceLimit(group, {
      maxX: map[0].length,
      maxY: map.length,
    }),
  );
  return filterUniqAntinodesForAntennas(allAntinodes).length;
}
