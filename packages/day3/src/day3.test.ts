import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  findValidStrings,
  multiplyInstructions,
  readAndParseInputFile,
} from "./day3.js";

describe("readAndParseInputFile", () => {
  it("should return a string with the content of the file", async () => {
    const expected =
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    assert.equal(result, expected);
  });
});

describe("findValidStrings", () => {
  it("should return a list of tuples for the valid mul strings", () => {
    const input =
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    const result = findValidStrings(input);

    assert.deepStrictEqual(result, [
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ]);
  });
});

describe("multiplyInstructions", () => {
  it("should return the sum of the multiplied entries", () => {
    const input = [
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ];
    const result = multiplyInstructions(input);
    assert.equal(result, 161);
  });
});
