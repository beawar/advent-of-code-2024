import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calcAntinodesForAntennas,
  calcAntinodesForAntennasWithoutDistanceLimit,
  filterUniqAntinodesForAntennas,
  getAntennasByFrequency,
  getUniqAntinodesCountFromMap,
  getUniqAntinodesCountFromMapWithoutDistanceLimit,
  readAndParseInputFile,
} from "./day8.ts";

describe("readAndParseInputFile", () => {
  it("should create the map as array of strings", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    assert.deepStrictEqual(result, [
      "............",
      "........0...",
      ".....0......",
      ".......0....",
      "....0.......",
      "......A.....",
      "............",
      "............",
      "........A...",
      ".........A..",
      "............",
      "............",
    ]);
  });
});

describe("calcAntinodesForAntennas", () => {
  it("should return all the position of the antinodes", () => {
    const antennas = [
      [
        { x: 4, y: 3 },
        { x: 5, y: 5 },
      ],
      [
        { x: 4, y: 3 },
        { x: 5, y: 5 },
        { x: 8, y: 4 },
      ],
    ];
    const expected = [
      [
        { x: 3, y: 1 },
        { x: 6, y: 7 },
      ],
      [
        { x: 3, y: 1 },
        { x: 6, y: 7 },
        { x: 0, y: 2 },
        { x: 2, y: 6 },
      ],
    ];

    antennas.forEach((group, index) => {
      const result = calcAntinodesForAntennas(group, { maxY: 10, maxX: 10 });
      assert.deepStrictEqual(result, expected[index]);
    });
  });
});

describe("getAntennasByFrequency", () => {
  it("should return a map with the frequencies as key and the positions of the antennas as value", () => {
    const map = [
      "............",
      "........0...",
      ".....0......",
      ".......0....",
      "....0.......",
      "......A.....",
      "............",
      "............",
      "........A...",
      ".........A..",
      "............",
      "............",
    ];
    const result = getAntennasByFrequency(map);
    assert.deepStrictEqual(result, {
      "0": [
        { x: 8, y: 1 },
        { x: 5, y: 2 },
        { x: 7, y: 3 },
        { x: 4, y: 4 },
      ],
      A: [
        { x: 6, y: 5 },
        { x: 8, y: 8 },
        { x: 9, y: 9 },
      ],
    });
  });
});

describe("filterValidUniqAntinodesForAntennas", () => {
  it("should return the uniq antinodes which are valid in the map", () => {
    const antinodes = [
      { x: 3, y: 1 },
      { x: 6, y: 7 },
      { x: 3, y: 1 },
      { x: 6, y: 7 },
      { x: 0, y: 2 },
      { x: 2, y: 6 },
    ];
    const result = filterUniqAntinodesForAntennas(antinodes);
    assert.deepStrictEqual(result, [
      { x: 3, y: 1 },
      { x: 6, y: 7 },
      { x: 0, y: 2 },
      { x: 2, y: 6 },
    ]);
  });
});

describe("getUniqAntinodesCountFromMap", () => {
  it("should return the number of uniq antinodes from a map", () => {
    const map = [
      "............",
      "........0...",
      ".....0......",
      ".......0....",
      "....0.......",
      "......A.....",
      "............",
      "............",
      "........A...",
      ".........A..",
      "............",
      "............",
    ];
    const result = getUniqAntinodesCountFromMap(map);
    assert.equal(result, 14);
  });
});

describe("calcAntinodesForAntennasWithoutDistanceLimit", () => {
  it("should return the antinodes for the antennas without limits on the distance", () => {
    const antennas = [
      [
        { x: 0, y: 0 },
        { x: 3, y: 1 },
        { x: 1, y: 2 },
      ],
    ];
    const expected = [
      [
        { x: 0, y: 0 },
        { x: 3, y: 1 },
        { x: 6, y: 2 },
        { x: 9, y: 3 },
        { x: 0, y: 0 },
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
        { x: 4, y: 8 },
        { x: 3, y: 1 },
        { x: 1, y: 2 },
        { x: 5, y: 0 },
      ],
    ];

    antennas.forEach((group, index) => {
      const result = calcAntinodesForAntennasWithoutDistanceLimit(group, {
        maxY: 10,
        maxX: 10,
      });
      assert.deepStrictEqual(result, expected[index]);
    });
  });
});

describe("getUniqAntinodesCountFromMapWithoutDistanceLimit", () => {
  it("should return the number of uniq antinodes", () => {
    const map = [
      "............",
      "........0...",
      ".....0......",
      ".......0....",
      "....0.......",
      "......A.....",
      "............",
      "............",
      "........A...",
      ".........A..",
      "............",
      "............",
    ];
    const result = getUniqAntinodesCountFromMapWithoutDistanceLimit(map);
    assert.equal(result, 34);
  });
});
