import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getDistinctPositionCount,
  moveNext,
  readAndParseInputFile,
  trackPath,
} from "./day6.js";

describe("readAndParseInputFile", () => {
  it("should return a matrix of the map", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    const expected = [
      "....#.....",
      ".........#",
      "..........",
      "..#.......",
      ".......#..",
      "..........",
      ".#..^.....",
      "........#.",
      "#.........",
      "......#...",
    ];
    assert.deepStrictEqual(result, expected);
  });
});

describe("moveNext", () => {
  it("should return the next position when moving top without obstacles", () => {
    const map = [".", "^"];
    const result = moveNext(map, { x: 0, y: 1, direction: "top" });
    assert.deepStrictEqual(result, { x: 0, y: 0, direction: "top" });
  });

  it("should return the same position but direction right when moving top with obstacle", () => {
    const map = ["#", "^"];
    const result = moveNext(map, { x: 0, y: 1, direction: "top" });
    assert.deepStrictEqual(result, { x: 0, y: 1, direction: "right" });
  });

  it("should return the next position when moving right without obstacles", () => {
    const map = ["..", "^."];
    const result = moveNext(map, { x: 0, y: 1, direction: "right" });
    assert.deepStrictEqual(result, { x: 1, y: 1, direction: "right" });
  });

  it("should return the same position but direction bottom when moving right with obstacle", () => {
    const map = ["..", "^#"];
    const result = moveNext(map, { x: 0, y: 1, direction: "right" });
    assert.deepStrictEqual(result, { x: 0, y: 1, direction: "bottom" });
  });

  it("should return the next position when moving bottom without obstacles", () => {
    const map = ["..", "^.", ".."];
    const result = moveNext(map, { x: 0, y: 1, direction: "bottom" });
    assert.deepStrictEqual(result, { x: 0, y: 2, direction: "bottom" });
  });

  it("should return the same position but direction left when moving bottom with obstacle", () => {
    const map = ["..", "^.", "#."];
    const result = moveNext(map, { x: 0, y: 1, direction: "bottom" });
    assert.deepStrictEqual(result, { x: 0, y: 1, direction: "left" });
  });

  it("should return the next position when moving left without obstacles", () => {
    const map = ["###", ".^#", "###"];
    const result = moveNext(map, { x: 1, y: 1, direction: "left" });
    assert.deepStrictEqual(result, { x: 0, y: 1, direction: "left" });
  });

  it("should return the same position but direction top when moving left with obstacle", () => {
    const map = ["###", "#^#", "###"];
    const result = moveNext(map, { x: 1, y: 1, direction: "left" });
    assert.deepStrictEqual(result, { x: 1, y: 1, direction: "top" });
  });

  it("should return y -1 when moving top to outside the map", () => {
    const map = ["#^#", "###", "###"];
    const result = moveNext(map, { x: 1, y: 0, direction: "top" });
    assert.deepStrictEqual(result, { x: 1, y: -1, direction: "top" });
  });

  it("should return y -1 when moving bottom to outside the map", () => {
    const map = ["###", "###", "#^#"];
    const result = moveNext(map, { x: 1, y: 2, direction: "bottom" });
    assert.deepStrictEqual(result, { x: 1, y: -1, direction: "bottom" });
  });

  it("should return x -1 when moving left to outside the map", () => {
    const map = ["###", "###", "^.#"];
    const result = moveNext(map, { x: 0, y: 2, direction: "left" });
    assert.deepStrictEqual(result, { x: -1, y: 2, direction: "left" });
  });

  it("should return x -1 when moving right to outside the map", () => {
    const map = ["###", "###", "..^"];
    const result = moveNext(map, { x: 2, y: 2, direction: "right" });
    assert.deepStrictEqual(result, { x: -1, y: 2, direction: "right" });
  });
});

describe("trackPath", () => {
  it("should return the positions of the path to exit the map", () => {
    const map = ["..#.", "...#", "#.^.", "..#."];
    const result = trackPath(map);
    const expected = [
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ];
    assert.deepStrictEqual(result, expected);
  });

  it("should return the positions of the path to exit the map 2", () => {
    const map = [
      "....#.....",
      ".........#",
      "..........",
      "..#.......",
      ".......#..",
      "..........",
      ".#..^.....",
      "........#.",
      "#.........",
      "......#...",
    ];
    const result = trackPath(map);
    const expected = [
      { x: 4, y: 6 },
      { x: 4, y: 5 },
      { x: 4, y: 4 },
      { x: 4, y: 3 },
      { x: 4, y: 2 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
      { x: 6, y: 1 },
      { x: 7, y: 1 },
      { x: 8, y: 1 },
      { x: 8, y: 2 },
      { x: 8, y: 3 },
      { x: 8, y: 4 },
      { x: 8, y: 5 },
      { x: 8, y: 6 },
      { x: 7, y: 6 },
      { x: 6, y: 6 },
      { x: 5, y: 6 },
      { x: 4, y: 6 },
      { x: 3, y: 6 },
      { x: 2, y: 6 },
      { x: 2, y: 5 },
      { x: 2, y: 4 },
      { x: 3, y: 4 },
      { x: 4, y: 4 },
      { x: 5, y: 4 },
      { x: 6, y: 4 },
      { x: 6, y: 5 },
      { x: 6, y: 6 },
      { x: 6, y: 7 },
      { x: 6, y: 8 },
      { x: 5, y: 8 },
      { x: 4, y: 8 },
      { x: 3, y: 8 },
      { x: 2, y: 8 },
      { x: 1, y: 8 },
      { x: 1, y: 7 },
      { x: 2, y: 7 },
      { x: 3, y: 7 },
      { x: 4, y: 7 },
      { x: 5, y: 7 },
      { x: 6, y: 7 },
      { x: 7, y: 7 },
      { x: 7, y: 8 },
      { x: 7, y: 9 },
    ];
    assert.deepStrictEqual(result, expected);
  });
});

describe("getDistinctPositionCount", () => {
  it("should return the number of distinct positions in the path", () => {
    const path = [
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ];
    const result = getDistinctPositionCount(path);
    assert.deepStrictEqual(result, 5);
  });

  it("should return the number of distinct positions in the path 2", () => {
    const path = [
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ];
    const result = getDistinctPositionCount(path);
    assert.deepStrictEqual(result, 5);
  });
});
