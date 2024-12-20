import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  findRegion,
  findNextSameRegion,
  readAndParseInputFile,
  calcArea,
  calcPerimeter,
  findDistinctRegions,
  calcTotalPriceFromMap,
} from "./day12.ts";

describe("readAndParseInputFile", () => {
  it("should return the map of the garden", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    assert.deepStrictEqual(result, ["AAAA", "BBCD", "BBCC", "EEEC"]);
  });
});

describe("findRegion", () => {
  it("should return the region starting from a position (A from 0,0)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findRegion(map, { x: 0, y: 0 });
    assert.deepStrictEqual(result, [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ]);
  });

  it("should return the region starting from a position (A from 1,0)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findRegion(map, { x: 1, y: 0 });
    const expected = [
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];
    assert.deepStrictEqual(result, expected);
  });

  it("should return the region starting from a position (C from 2,1)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findRegion(map, { x: 2, y: 1 });
    const expected = [
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
    ];
    assert.deepStrictEqual(result, expected);
  });
});

describe("isSameRegion", () => {
  it("should return the next position in direction right if is of the same type", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 0, y: 0 }, "right");
    assert.deepStrictEqual(result, { x: 1, y: 0 });
  });
  it("should return the next position in direction left if is of the same type", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 1, y: 0 }, "left");
    assert.deepStrictEqual(result, { x: 0, y: 0 });
  });
  it("should return the next position in direction top if is of the same type", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 2, y: 2 }, "top");
    assert.deepStrictEqual(result, { x: 2, y: 1 });
  });
  it("should return the next position in direction bottom if is of the same type", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 0, y: 1 }, "bottom");
    assert.deepStrictEqual(result, { x: 0, y: 2 });
  });
  it("should return undefined if the next position in direction right is of the same type", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 2, y: 1 }, "right");
    assert.deepStrictEqual(result, undefined);
  });
  it("should return undefined if the next position in direction left is of different type", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 2, y: 2 }, "left");
    assert.deepStrictEqual(result, undefined);
  });
  it("should return undefined if the next position in direction top is of different type", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 1, y: 1 }, "top");
    assert.deepStrictEqual(result, undefined);
  });
  it("should return undefined if the next position in direction bottom is of different type", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 2, y: 2 }, "bottom");
    assert.deepStrictEqual(result, undefined);
  });
  it("should return undefined if next position in direction top is out of map", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 0, y: 0 }, "top");
    assert.deepStrictEqual(result, undefined);
  });
  it("should return undefined if next position in direction bottom is out of map", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 0, y: 3 }, "bottom");
    assert.deepStrictEqual(result, undefined);
  });
  it("should return undefined if next position in direction left is out of map", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 0, y: 1 }, "left");
    assert.deepStrictEqual(result, undefined);
  });
  it("should return undefined if next position in direction right is out of map", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = findNextSameRegion(map, { x: 3, y: 1 }, "right");
    assert.deepStrictEqual(result, undefined);
  });
});

describe("calcArea", () => {
  it("should return the area of a region", () => {
    const region = [
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
    ];
    const result = calcArea(region);
    assert.strictEqual(result, 4);
  });
});

describe("calcPerimeter", () => {
  it("should return the perimeter of a region (C)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const region = [
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
    ];
    const result = calcPerimeter(map, region);
    assert.strictEqual(result, 10);
  });

  it("should return the perimeter of a region (B)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const region = [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ];
    const result = calcPerimeter(map, region);
    assert.strictEqual(result, 8);
  });
  it("should return the perimeter of a region (A)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const region = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];
    const result = calcPerimeter(map, region);
    assert.strictEqual(result, 10);
  });
});

describe("findDistinctRegions", () => {
  it("should return all the distinct regions for a map", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const expected = [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
      [
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
      [
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 3, y: 3 },
      ],
      [{ x: 3, y: 1 }],
      [
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
      ],
    ];
    const result = findDistinctRegions(map);
    assert.deepStrictEqual(result, expected);
  });
});

describe("calcTotalPriceFromMap", () => {
  it("should return the total price (example 1)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = calcTotalPriceFromMap(map);
    assert.deepStrictEqual(result, 140);
  });

  it("should return the total price (example 2)", () => {
    const map = ["OOOOO", "OXOXO", "OOOOO", "OXOXO", "OOOOO"];
    const result = calcTotalPriceFromMap(map);
    assert.deepStrictEqual(result, 772);
  });

  it("should return the total price (example 3)", () => {
    const map = [
      "RRRRIICCFF",
      "RRRRIICCCF",
      "VVRRRCCFFF",
      "VVRCCCJFFF",
      "VVVVCJJCFE",
      "VVIVCCJJEE",
      "VVIIICJJEE",
      "MIIIIIJJEE",
      "MIIISIJEEE",
      "MMMISSJEEE",
    ];
    const result = calcTotalPriceFromMap(map);
    assert.deepStrictEqual(result, 1930);
  });
});
