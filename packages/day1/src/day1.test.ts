import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateDistance, calculateSimilarityScore } from "./day1.ts";

describe("calculateDistance", () => {
  it("should return 0 if the input arrays are empty", () => {
    const result = calculateDistance([], []);
    assert.equal(result, 0);
  });

  it("should throw if the inputs have different lengths", () => {
    assert.throws(
      () => calculateDistance([1, 2], [1]),
      Error("inputs have different lengths"),
    );
  });

  it("should return the distance between the values on inputs of length 1 and input1 values is lower than input2 value", () => {
    const result = calculateDistance([2], [5]);
    assert.equal(result, 3);
  });

  it("should return 0 on inputs of length 1 with the same value", () => {
    const result = calculateDistance([2], [2]);
    assert.equal(result, 0);
  });

  it("should return the distance between the values on inputs of length 1 and input1 values is greater than input2 value", () => {
    const result = calculateDistance([5], [2]);
    assert.equal(result, 3);
  });

  it("should return the distance between the incrementally lowest values couples", () => {
    const result = calculateDistance([5, 1], [2, 9]);
    assert.equal(result, 5);
  });
});

describe("calculateSimilarityScore", () => {
  it("should return 0 if the input arrays are empty", () => {
    const result = calculateSimilarityScore([], []);
    assert.equal(result, 0);
  });

  it("should throw if the inputs have different lengths", () => {
    assert.throws(
      () => calculateSimilarityScore([1, 2], [1]),
      Error("inputs have different lengths"),
    );
  });

  it("should return the value of the input1 if inputs have length 1 and the same value", () => {
    const result = calculateSimilarityScore([2], [2]);
    assert.equal(result, 2);
  });

  it("should return 0 if none of the values of the input1 is in input2", () => {
    const result = calculateSimilarityScore([2, 3, 4], [5, 6, 7]);
    assert.equal(result, 0);
  });

  it("should return the sum of the values of input1 if the input contains the same values", () => {
    const result = calculateSimilarityScore([1, 2, 3, 4], [2, 4, 3, 1]);
    assert.equal(result, 10);
  });

  it("should return the sum of the values of input1 multiplied by the presences in input2", () => {
    const result = calculateSimilarityScore([1, 2, 3, 4], [4, 2, 4, 3]);
    assert.equal(result, 13);
  });
});
