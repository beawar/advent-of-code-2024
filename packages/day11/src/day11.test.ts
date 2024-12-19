import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { blink, readAndParseInputFile, transformStone } from "./day11.ts";

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

describe("blink", () => {
  it("should return the new stones after one blink", () => {
    const stones = [0, 1, 10, 99, 999];
    const result = blink(stones, 1);
    assert.deepStrictEqual(result, [1, 2024, 1, 0, 9, 9, 2021976]);
  });

  it("should return the new stones after 2 blinks", () => {
    const stones = [125, 17];
    const result = blink(stones, 2);
    assert.deepStrictEqual(result, [253, 0, 2024, 14168]);
  });

  it("should return the new stones after 6 blinks", () => {
    const stones = [125, 17];
    const result = blink(stones, 6);
    assert.deepStrictEqual(
      result,
      [
        2097446912, 14168, 4048, 2, 0, 2, 4, 40, 48, 2024, 40, 48, 80, 96, 2, 8,
        6, 7, 6, 0, 3, 2,
      ],
    );
  });
});
