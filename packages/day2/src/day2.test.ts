import { describe, it } from "node:test";
import {
  getNumberOfSafeRecords,
  isSafe,
  readAndParseInputFile,
} from "./day2.js";
import assert from "node:assert/strict";

describe("readAndParseInputFile", () => {
  it("should return a matrix of the values", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    assert.deepStrictEqual(result, [
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ]);
  });
});

describe("isSafe", () => {
  it("should return false if not all values are decreasing", () => {
    const input = [7, 6, 5, 6, 5, 4];
    const result = isSafe(input);
    assert.equal(result, false);
  });

  it("should return false if not all values are increasing", () => {
    const input = [1, 2, 3, 2, 4, 5];
    const result = isSafe(input);
    assert.equal(result, false);
  });

  it("should return false if the distance between two increasing values is greater than 3", () => {
    const input = [1, 2, 3, 7, 8, 9];
    const result = isSafe(input);
    assert.equal(result, false);
  });

  it("should return false if the distance between two decreasing values is greater than 3", () => {
    const input = [9, 8, 7, 3, 2, 1];
    const result = isSafe(input);
    assert.equal(result, false);
  });

  it("should return false if the distance between two decreasing values is 0", () => {
    const input = [9, 8, 7, 7, 2, 1];
    const result = isSafe(input);
    assert.equal(result, false);
  });

  it("should return false if the distance between two increasing values is 0", () => {
    const input = [1, 2, 3, 3, 8, 9];
    const result = isSafe(input);
    assert.equal(result, false);
  });

  it("should return true if all values are increasing with a distance between 1 and 3", () => {
    const input = [1, 2, 4, 7, 8, 9];
    const result = isSafe(input);
    assert.equal(result, true);
  });

  it("should return true if all values are decreasing with a distance between 1 and 3", () => {
    const input = [9, 8, 7, 4, 2, 1];
    const result = isSafe(input);
    assert.equal(result, true);
  });
});

describe("getNumberOfSafeRecords", () => {
  it("should return the number of safe reports", () => {
    const input = [
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ];
    const result = getNumberOfSafeRecords(input);
    assert.equal(result, 2);
  });
});
