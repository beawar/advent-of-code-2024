import { describe, it } from "node:test";
import {
  fixUnorderedUpdate,
  getOrderedUpdates,
  getUnorderedUpdates,
  isUpdateOrdered,
  readAndParseInputFile,
  sumMiddlePages,
} from "./day5.js";
import assert from "node:assert/strict";

const orderingRules: [number, number][] = [
  [47, 53],
  [97, 13],
  [97, 61],
  [97, 47],
  [75, 29],
  [61, 13],
  [75, 53],
  [29, 13],
  [97, 29],
  [53, 29],
  [61, 53],
  [97, 53],
  [61, 29],
  [47, 13],
  [75, 47],
  [97, 75],
  [47, 61],
  [75, 61],
  [47, 29],
  [75, 13],
  [53, 13],
];

describe("readAndParseFileInput", () => {
  it("should return the ordering rules as tuples of number and the updates as array of numbers", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    const pageUpdates = [
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
      [75, 97, 47, 61, 53],
      [61, 13, 29],
      [97, 13, 75, 29, 47],
    ];
    assert.deepStrictEqual(result, {
      rules: orderingRules,
      updates: pageUpdates,
    });
  });
});

describe("isUpdateOrdered", () => {
  it("should return true if the updated values are included in the right order inside the flat ordered rules", () => {
    const update = [75, 47, 61, 53, 29];
    const result = isUpdateOrdered(update, orderingRules);
    assert.equal(result, true);
  });

  it("should return false if the updated values are included in the right order inside the flat ordered rules 1", () => {
    const update = [75, 97, 47, 61, 53];
    const result = isUpdateOrdered(update, orderingRules);
    assert.equal(result, false);
  });

  it("should return false if the updated values are included in the right order inside the flat ordered rules 2", () => {
    const update = [61, 13, 29];
    const result = isUpdateOrdered(update, orderingRules);
    assert.equal(result, false);
  });

  it("should return false if the updated values are included in the right order inside the flat ordered rules 3", () => {
    const update = [97, 13, 75, 29, 47];
    const result = isUpdateOrdered(update, orderingRules);
    assert.equal(result, false);
  });
});

describe("sumMiddlePages", () => {
  it("should sum the value of the middle pages of the given updates", () => {
    const input = [
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
    ];
    const result = sumMiddlePages(input);
    assert.equal(result, 143);
  });
});

describe("getOrderedUpdates", () => {
  it("should return only the valid ordered updates", () => {
    const input = [
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
      [75, 97, 47, 61, 53],
      [61, 13, 29],
      [97, 13, 75, 29, 47],
    ];
    const expected = [
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
    ];
    const result = getOrderedUpdates(input, orderingRules);
    assert.deepStrictEqual(result, expected);
  });
});

describe("getUnorderedUpdates", () => {
  it("should return only the valid ordered updates", () => {
    const input = [
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
      [75, 97, 47, 61, 53],
      [61, 13, 29],
      [97, 13, 75, 29, 47],
    ];
    const expected = [
      [75, 97, 47, 61, 53],
      [61, 13, 29],
      [97, 13, 75, 29, 47],
    ];
    const result = getUnorderedUpdates(input, orderingRules);
    assert.deepStrictEqual(result, expected);
  });
});

describe("fixUnorderedUpdated", () => {
  it("should return the update with the correct sequence 1", () => {
    const input = [75, 97, 47, 61, 53];
    const result = fixUnorderedUpdate(input, orderingRules);
    const expected = [97, 75, 47, 61, 53];
    assert.deepStrictEqual(result, expected);
  });

  it("should return the update with the correct sequence 2", () => {
    const input = [61, 13, 29];
    const result = fixUnorderedUpdate(input, orderingRules);
    const expected = [61, 29, 13];
    assert.deepStrictEqual(result, expected);
  });

  it("should return the update with the correct sequence 3", () => {
    const input = [97, 13, 75, 29, 47];
    const result = fixUnorderedUpdate(input, orderingRules);
    const expected = [97, 75, 47, 29, 13];
    assert.deepStrictEqual(result, expected);
  });
});
