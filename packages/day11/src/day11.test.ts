import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  countResultingStones,
  countResultingStonesFromStone,
  readAndParseInputFile,
  transformStone,
} from "./day11.ts";

describe("readAndParseInputFile", () => {
  it("should return the array of number representing the stones", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    assert.deepStrictEqual(result, [0, 1, 10, 99, 999]);
  });
});

describe("transformStone", () => {
  it("should return 1 if the stone is 0", () => {
    const stone = 0;
    const result = transformStone(stone);
    assert.deepStrictEqual(result, [1]);
  });

  it("should return the stone split in 2 if the stone length is even", () => {
    const stone = 99;
    const result = transformStone(stone);
    assert.deepStrictEqual(result, [9, 9]);
  });

  it("should trim the zeros when splitting the stone with even length", () => {
    const stone = 1000;
    const result = transformStone(stone);
    assert.deepStrictEqual(result, [10, 0]);
  });

  it("should multiply the stone by 2024 if none of the previous rules match", () => {
    const stone = 999;
    const result = transformStone(stone);
    assert.deepStrictEqual(result, [2021976]);
  });
});

describe("countResultingStones", () => {
  it("should return the number of stones created by 6 blinks", () => {
    const stones = [125, 17];
    const result = countResultingStones(stones, 6);
    assert.equal(result, 22);
  });

  it("should return the number of stones created by 25 blinks", () => {
    const stones = [125, 17];
    const result = countResultingStones(stones, 25);
    assert.equal(result, 55312);
  });
});

describe("countResultingStonesFromStone", () => {
  it("should return the number of stones created after 6 blinks from a single stone", () => {
    const stone = 125;
    const result = countResultingStonesFromStone(stone, 6);
    assert.equal(result, 7);
  });
});
