import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calcChecksum,
  createFileBlocks,
  createSpaceBlocks,
  mergeBlocks,
  mergeBlocksNoBreak,
  readAndParseInputFile,
} from "./day9.ts";

describe("readAndParseInputFile", () => {
  it("should return the string", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    assert.deepStrictEqual(result, "2333133121414131402");
  });
});

it("createFileBlocks should create the array of the file blocks", () => {
  const input = "12345";
  const result = createFileBlocks(input);
  assert.deepStrictEqual(result, [1, 3, 5]);
});

it("createSpaceBlocks should create the array of space blocks", () => {
  const input = "12345";
  const result = createSpaceBlocks(input);
  assert.deepStrictEqual(result, [2, 4]);
});

describe("mergeBlocks", () => {
  it("should merge the arrays filling the spaces with files (12345)", () => {
    const files = [1, 3, 5];
    const spaces = [2, 4];
    const result = mergeBlocks(files, spaces);
    assert.deepStrictEqual(result, [0, 2, 2, 1, 1, 1, 2, 2, 2]);
  });

  it("should merge the arrays filling the spaces with files (2333133121414131402)", () => {
    const files = [2, 3, 1, 3, 2, 4, 4, 3, 4, 2];
    const spaces = [3, 3, 3, 1, 1, 1, 1, 1, 0];
    const result = mergeBlocks(files, spaces);
    assert.deepStrictEqual(
      result,
      [
        0, 0, 9, 9, 8, 1, 1, 1, 8, 8, 8, 2, 7, 7, 7, 3, 3, 3, 6, 4, 4, 6, 5, 5,
        5, 5, 6, 6,
      ],
    );
  });
});

describe("calcChecksum", () => {
  it("calcChecksum should return the sum of the product of each index with the value at that index", () => {
    const input = [
      0, 0, 9, 9, 8, 1, 1, 1, 8, 8, 8, 2, 7, 7, 7, 3, 3, 3, 6, 4, 4, 6, 5, 5, 5,
      5, 6, 6,
    ];
    const result = calcChecksum(input);
    assert.equal(result, 1928);
  });
  it("should ignore dots and sum only numbers", () => {
    const input: (number | ".")[] = [
      0,
      0,
      9,
      9,
      2,
      1,
      1,
      1,
      7,
      7,
      7,
      ".",
      4,
      4,
      ".",
      3,
      3,
      3,
      ".",
      ".",
      ".",
      ".",
      5,
      5,
      5,
      5,
      ".",
      6,
      6,
      6,
      6,
      ".",
      ".",
      ".",
      ".",
      ".",
      8,
      8,
      8,
      8,
      ".",
      ".",
    ];
    const result = calcChecksum(input);
    assert.equal(result, 2858);
  });
});

describe("mergeBlocksNoBreak", () => {
  it("should merge the arrays filling the spaces with the file with greatest id that fit in the space block", () => {
    const files = [2, 3, 1, 3, 2, 4, 4, 3, 4, 2];
    const spaces = [3, 3, 3, 1, 1, 1, 1, 1, 0];
    const result = mergeBlocksNoBreak(files, spaces);
    assert.deepStrictEqual(result, [
      0,
      0,
      9,
      9,
      2,
      1,
      1,
      1,
      7,
      7,
      7,
      ".",
      4,
      4,
      ".",
      3,
      3,
      3,
      ".",
      ".",
      ".",
      ".",
      5,
      5,
      5,
      5,
      ".",
      6,
      6,
      6,
      6,
      ".",
      ".",
      ".",
      ".",
      ".",
      8,
      8,
      8,
      8,
      ".",
      ".",
    ]);
  });

  it("should handle arrays longer than 10", () => {
    const files = [2, 3, 1, 3, 2, 4, 4, 3, 4, 4, 2];
    const spaces = [3, 3, 3, 1, 1, 1, 1, 1, 0, 0];
    const result = mergeBlocksNoBreak(files, spaces);
    assert.deepStrictEqual(result, [
      0,
      0,
      10,
      10,
      2,
      1,
      1,
      1,
      7,
      7,
      7,
      ".",
      4,
      4,
      ".",
      3,
      3,
      3,
      ".",
      ".",
      ".",
      ".",
      5,
      5,
      5,
      5,
      ".",
      6,
      6,
      6,
      6,
      ".",
      ".",
      ".",
      ".",
      ".",
      8,
      8,
      8,
      8,
      9,
      9,
      9,
      9,
      ".",
      ".",
    ]);
  });
});
