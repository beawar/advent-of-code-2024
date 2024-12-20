import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  findRegion,
  findNextSameRegion,
  readAndParseInputFile,
  calcArea,
  calcPerimeter,
  findDistinctRegions,
  calcPriceAreaPerPerimeterFromMap,
  calcSides,
  calcPriceAreaPerSidesFromMap,
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

describe("calcPriceAreaPerPerimeterFromMap", () => {
  it("should return the total price (example 1)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = calcPriceAreaPerPerimeterFromMap(map);
    assert.deepStrictEqual(result, 140);
  });

  it("should return the total price (example 2)", () => {
    const map = ["OOOOO", "OXOXO", "OOOOO", "OXOXO", "OOOOO"];
    const result = calcPriceAreaPerPerimeterFromMap(map);
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
    const result = calcPriceAreaPerPerimeterFromMap(map);
    assert.deepStrictEqual(result, 1930);
  });
});

describe("calcSides", () => {
  it("should return the sides of a region (C)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const region = [
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 8);
  });

  it("should return the sides of a region (B)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const region = [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 4);
  });
  it("should return the sides of a region (A)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const region = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 4);
  });
  it("should return the sides of a region (E)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const region = [
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 4);
  });
  it("should return the sides of a region (D)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const region = [{ x: 3, y: 1 }];
    const result = calcSides(map, region);
    assert.strictEqual(result, 4);
  });

  it("should return the sides of a region (other 1)", () => {
    const map = ["....", "...X", "...X", "...."];
    const region = [
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 4);
  });

  it("should return the sides of a region (other 2)", () => {
    const map = ["......", "...XX.", "...X..", "......"];
    const region = [
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 4, y: 1 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 6);
  });

  it("should return the sides of a region (other 3)", () => {
    const map = [".......", "...XXX.", "...XXX.", "...XXX."];
    const region = [
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 4);
  });

  it("should return the sides of a region (other 4)", () => {
    const map = [".......", "...XXX.", "...XX..", "...XXX."];
    const region = [
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 5, y: 1 },
      { x: 5, y: 3 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 8);
  });

  it("should return the sides of a region (other 5)", () => {
    const map = [".......", "...XXX.", "...X.X.", "...XXX."];
    const region = [
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 1 },
      { x: 4, y: 3 },
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 8);
  });

  it("should return the sides of a region (other 6)", () => {
    const map = ["XXXX", "X...", "X...", "X...", "X..."];
    const region = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
      { x: 0, y: 4 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 6);
  });

  it("should return the sides of a region (other 7)", () => {
    const map = ["XXXX", "X.X.", "X...", "XX..", "X..."];
    const region = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 0, y: 4 },
    ];
    const result = calcSides(map, region);
    assert.strictEqual(result, 14);
  });
});

describe("calcPriceAreaPerSidesFromMap", () => {
  it("should return the total price (example 1)", () => {
    const map = ["AAAA", "BBCD", "BBCC", "EEEC"];
    const result = calcPriceAreaPerSidesFromMap(map);
    assert.deepStrictEqual(result, 80);
  });

  it("should return the total price (example 2)", () => {
    const map = ["EEEEE", "EXXXX", "EEEEE", "EXXXX", "EEEEE"];
    const result = calcPriceAreaPerSidesFromMap(map);
    assert.deepStrictEqual(result, 236);
  });

  it("should return the total price (example 3)", () => {
    const map = ["AAAAAA", "AAABBA", "AAABBA", "ABBAAA", "ABBAAA", "AAAAAA"];
    const result = calcPriceAreaPerSidesFromMap(map);
    assert.deepStrictEqual(result, 368);
  });
  it("should return the total price (example 4)", () => {
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
    const result = calcPriceAreaPerSidesFromMap(map);
    assert.deepStrictEqual(result, 1206);
  });
});
