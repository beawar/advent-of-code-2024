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

describe("isSafe with tolerance 0", () => {
  it("should return false if not all values are decreasing", () => {
    const input = [7, 6, 5, 6, 5, 4];
    const result = isSafe(input, 0);
    assert.equal(result, false);
  });

  it("should return false if not all values are increasing", () => {
    const input = [1, 2, 3, 2, 4, 5];
    const result = isSafe(input, 0);
    assert.equal(result, false);
  });

  it("should return false if the distance between two increasing values is greater than 3", () => {
    const input = [1, 2, 3, 7, 8, 9];
    const result = isSafe(input, 0);
    assert.equal(result, false);
  });

  it("should return false if the distance between two decreasing values is greater than 3", () => {
    const input = [9, 8, 7, 3, 2, 1];
    const result = isSafe(input, 0);
    assert.equal(result, false);
  });

  it("should return false if the distance between two decreasing values is 0", () => {
    const input = [9, 8, 7, 7, 2, 1];
    const result = isSafe(input, 0);
    assert.equal(result, false);
  });

  it("should return false if the distance between two increasing values is 0", () => {
    const input = [1, 2, 3, 3, 8, 9];
    const result = isSafe(input, 0);
    assert.equal(result, false);
  });

  it("should return true if all values are increasing with a distance between 1 and 3", () => {
    const input = [1, 2, 4, 7, 8, 9];
    const result = isSafe(input, 0);
    assert.equal(result, true);
  });

  it("should return true if all values are decreasing with a distance between 1 and 3", () => {
    const input = [9, 8, 7, 4, 2, 1];
    const result = isSafe(input, 0);
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

describe("isSafe with tolerance 1", () => {
  it("should return false if 2 values are increasing when 3 ore more are decreasing", () => {
    const input = [7, 8, 9, 6, 5, 4, 3];
    const result = isSafe(input, 1);
    assert.equal(result, false);
  });

  it("should return true if only 1 value is not decreasing and it is at the start", () => {
    const input = [7, 8, 6, 5, 4, 3];
    const result = isSafe(input, 1);
    assert.equal(result, true);
  });

  it("should return true if only 1 value is not decreasing and it is in the middle", () => {
    const input = [7, 6, 5, 6, 4, 3];
    const result = isSafe(input, 1);
    assert.equal(result, true);
  });

  it("should return true if only 1 value is not increasing and it is at the start", () => {
    const input = [2, 1, 3, 4, 5, 6];
    const result = isSafe(input, 1);
    assert.equal(result, true);
  });

  it("should return true if only 1 value is not increasing and it is in the middle", () => {
    const input = [2, 3, 4, 3, 5, 6];
    const result = isSafe(input, 1);
    assert.equal(result, true);
  });

  it("should return false if 2 values are decreasing when 3 or more are increasing", () => {
    const input = [7, 6, 5, 8, 9, 10];
    const result = isSafe(input, 1);
    assert.equal(result, false);
  });

  it("should return false if the distance between the values near the faulty value is lower than 1", () => {
    const input = [1, 2, 0, 2, 3, 4];
    const result = isSafe(input, 1);
    assert.equal(result, false);
  });

  it("should return false if the distance between the values near the faulty value is greater than 3", () => {
    const input = [9, 8, 10, 4];
    const result = isSafe(input, 1);
    assert.equal(result, false);
  });

  it("should return true if the distance between the values near the faulty value is 1", () => {
    const input = [1, 3, 2, 4, 5];
    const result = isSafe(input, 1);
    assert.equal(result, true);
  });

  it("should return true if the distance between the values near the faulty value is 2", () => {
    const input = [8, 6, 4, 4, 1];
    const result = isSafe(input, 1);
    assert.equal(result, true);
  });

  it("should return true if the distance between the values near the faulty value is 3", () => {
    const input = [8, 6, 10, 3, 1];
    const result = isSafe(input, 1);
    assert.equal(result, true);
  });

  it("should return true if the faulty value is the first one", () => {
    const input = [8, 7, 8, 11, 12];
    const result = isSafe(input, 1);
    assert.equal(result, true);
  });
});
