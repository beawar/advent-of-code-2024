import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  findNextSteps,
  findScoreOfTrailhead,
  findTrailheadRating,
  findTrailPaths,
  readAndParseInputFile,
  sumTrailheadRatings,
  sumTrailheadScores,
} from "./day10.ts";

describe("readAndParseInputFile", () => {
  it("should return the matrix of the map", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    assert.deepStrictEqual(result, [
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [8, 7, 6, 5],
      [9, 8, 7, 6],
    ]);
  });
});

describe("findScoreOfTrailhead", () => {
  it("should return 1 if there is only 1 distinct 9 reachable from a 0", () => {
    const map = [
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [8, 7, 6, 5],
      [9, 8, 7, 6],
    ];
    const result = findScoreOfTrailhead(map, { x: 0, y: 0 });
    assert.equal(result, 1);
  });
  it("should return 2 if there are 2 distinct 9 reachable from a 0", () => {
    const map = [
      [-1, -1, -1, 0, -1, -1, -1],
      [-1, -1, -1, 1, -1, -1, -1],
      [-1, -1, -1, 2, -1, -1, -1],
      [6, 5, 4, 3, 4, 5, 6],
      [7, -1, -1, -1, -1, -1, 7],
      [8, -1, -1, -1, -1, -1, 8],
      [9, -1, -1, -1, -1, -1, 9],
    ];
    const result = findScoreOfTrailhead(map, { x: 3, y: 0 });
    assert.equal(result, 2);
  });
});

describe("findNextSteps", () => {
  it("should return all the position matching a valid next height (0)", () => {
    const map = [
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [8, 7, 6, 5],
      [9, 8, 7, 6],
    ];
    const result = findNextSteps(map, { x: 0, y: 0 });
    assert.deepStrictEqual(result, [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ]);
  });

  it("should return all the position matching a valid next height (1)", () => {
    const map = [
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [8, 7, 6, 5],
      [9, 8, 7, 6],
    ];
    const result = findNextSteps(map, { x: 1, y: 0 });
    assert.deepStrictEqual(result, [
      { x: 1, y: 1 },
      { x: 2, y: 0 },
    ]);
  });
});

describe("findTrailPaths", () => {
  it("should return all the valid paths", () => {
    const map = [
      [-1, -1, -1, 0, -1, -1, -1],
      [-1, -1, -1, 1, -1, -1, -1],
      [-1, -1, -1, 2, -1, -1, -1],
      [6, 5, 4, 3, 4, 5, 6],
      [7, -1, -1, -1, -1, -1, 7],
      [8, -1, -1, -1, -1, -1, 8],
      [9, -1, -1, -1, -1, -1, 9],
    ];
    const paths = findTrailPaths(map, { x: 3, y: 0 });
    assert.deepStrictEqual(paths, [
      [
        { x: 3, y: 0 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 3, y: 3 },
        { x: 2, y: 3 },
        { x: 1, y: 3 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
        { x: 0, y: 5 },
        { x: 0, y: 6 },
      ],
      [
        { x: 3, y: 0 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 6, y: 3 },
        { x: 6, y: 4 },
        { x: 6, y: 5 },
        { x: 6, y: 6 },
      ],
    ]);
  });
});

describe("sumTrailheadScores", () => {
  it("should sum the score of the trailheads", () => {
    const map = [
      [8, 9, 0, 1, 0, 1, 2, 3],
      [7, 8, 1, 2, 1, 8, 7, 4],
      [8, 7, 4, 3, 0, 9, 6, 5],
      [9, 6, 5, 4, 9, 8, 7, 4],
      [4, 5, 6, 7, 8, 9, 0, 3],
      [3, 2, 0, 1, 9, 0, 1, 2],
      [0, 1, 3, 2, 9, 8, 0, 1],
      [1, 0, 4, 5, 6, 7, 3, 2],
    ];
    const result = sumTrailheadScores(map);
    assert.equal(result, 36);
  });
});

describe("findTrailheadRating", () => {
  it("should return the number of distinct path", () => {
    const map = [
      [-1, -1, -1, -1, -1, 0, -1],
      [-1, -1, 4, 3, 2, 1, -1],
      [-1, -1, 5, -1, -1, 2, -1],
      [-1, -1, 6, 5, 4, 3, -1],
      [-1, -1, 7, -1, -1, 4, -1],
      [-1, -1, 8, 7, 6, 5, -1],
      [-1, -1, 9, -1, -1, -1, -1],
    ];
    const result = findTrailheadRating(map, { x: 5, y: 0 });
    assert.equal(result, 3);
  });

  it("should return the number of distinct path (test 2)", () => {
    const map = [
      [-1, -1, 9, 0, -1, -1, 9],
      [-1, -1, -1, 1, -1, 9, 8],
      [-1, -1, -1, 2, -1, -1, 7],
      [6, 5, 4, 3, 4, 5, 6],
      [7, 6, 5, -1, 9, 8, 7],
      [8, 7, 6, -1, -1, -1, -1],
      [9, 8, 7, -1, -1, -1, -1],
    ];
    const result = findTrailheadRating(map, { x: 3, y: 0 });
    assert.equal(result, 13);
  });

  it("should return the number of distinct path (test 3)", () => {
    const map = [
      [0, 1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8],
      [4, -1, 6, 7, 8, 9],
      [5, 6, 7, 8, 9, -1],
    ];
    const result = findTrailheadRating(map, { x: 0, y: 0 });
    assert.equal(result, 227);
  });
});

describe("sumTrailheadRatings", () => {
  it("should sum the rating of the trailheads", () => {
    const map = [
      [8, 9, 0, 1, 0, 1, 2, 3],
      [7, 8, 1, 2, 1, 8, 7, 4],
      [8, 7, 4, 3, 0, 9, 6, 5],
      [9, 6, 5, 4, 9, 8, 7, 4],
      [4, 5, 6, 7, 8, 9, 0, 3],
      [3, 2, 0, 1, 9, 0, 1, 2],
      [0, 1, 3, 2, 9, 8, 0, 1],
      [1, 0, 4, 5, 6, 7, 3, 2],
    ];
    const result = sumTrailheadRatings(map);
    assert.equal(result, 81);
  });
});
