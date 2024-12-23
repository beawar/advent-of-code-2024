import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  findCombination,
  findMinimumTokensToWinPrizes,
  readAndParseInputFile, remapPrizePosition,
} from "./day13.ts";

describe("readAndParseInputFile", () => {
  it("should return all the buttons configuration and the price position", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    assert.deepStrictEqual(result, [
      {
        buttonA: { x: 94, y: 34, tokens: 3 },
        buttonB: { x: 22, y: 67, tokens: 1 },
        prize: { x: 8400, y: 5400 },
      },
      {
        buttonA: { x: 26, y: 66, tokens: 3 },
        buttonB: { x: 67, y: 21, tokens: 1 },
        prize: { x: 12748, y: 12176 },
      },
      {
        buttonA: { x: 17, y: 86, tokens: 3 },
        buttonB: { x: 84, y: 37, tokens: 1 },
        prize: { x: 7870, y: 6450 },
      },
      {
        buttonA: { x: 69, y: 23, tokens: 3 },
        buttonB: { x: 27, y: 71, tokens: 1 },
        prize: { x: 18641, y: 10279 },
      },
    ]);
  });
});

describe("findCombination", () => {
  it("should return the combination of button presses to get to the prize position (first part 1)", () => {
    const input = {
      buttonA: { x: 94, y: 34, tokens: 3 },
      buttonB: { x: 22, y: 67, tokens: 1 },
      prize: { x: 8400, y: 5400 },
    };
    const result = findCombination(input, 100);
    assert.deepStrictEqual(result, { buttonA: 80, buttonB: 40, tokens: 280 });
  });

  it("should return the combination of button presses to get to the prize position (first part 2)", () => {
    const input = {
      buttonA: { x: 94, y: 34, tokens: 3 },
      buttonB: { x: 22, y: 67, tokens: 1 },
      prize: { x: 10000000008400, y: 10000000005400 },
    };
    const result = findCombination(input);
    assert.deepStrictEqual(result, undefined);
  });

  it("should return the combination of button presses to get to the prize position (second part 1)", () => {
    const input = {
      buttonA: { x: 26, y: 66, tokens: 3 },
      buttonB: { x: 67, y: 21, tokens: 1 },
      prize: { x: 12748, y: 12176 },
    };
    const result = findCombination(input, 100);
    assert.deepStrictEqual(result, undefined);
  });

  it("should return the combination of button presses to get to the prize position (second part 2)", () => {
    const input = {
      buttonA: { x: 26, y: 66, tokens: 3 },
      buttonB: { x: 67, y: 21, tokens: 1 },
      prize: { x: 10000000012748, y: 10000000012176 },
    };
    const result = findCombination(input);
    assert.deepStrictEqual(result, undefined);
  });

  it("should return the combination of button presses to get to the prize position (third part 1)", () => {
    const input = {
      buttonA: { x: 17, y: 86, tokens: 3 },
      buttonB: { x: 84, y: 37, tokens: 1 },
      prize: { x: 7870, y: 6450 },
    };
    const result = findCombination(input, 100);
    assert.deepStrictEqual(result, { buttonA: 38, buttonB: 86, tokens: 200 });
  });

  it("should return the combination of button presses to get to the prize position (third part 2)", () => {
    const input = {
      buttonA: { x: 17, y: 86, tokens: 3 },
      buttonB: { x: 84, y: 37, tokens: 1 },
      prize: { x: 10000000007870, y: 10000000006450 },
    };
    const result = findCombination(input);
    assert.deepStrictEqual(result, undefined);
  });

  it("should return the combination of button presses to get to the prize position (fourth part 1)", () => {
    const input = {
      buttonA: { x: 69, y: 23, tokens: 3 },
      buttonB: { x: 27, y: 71, tokens: 1 },
      prize: { x: 18641, y: 10279 },
    };
    const result = findCombination(input, 100);
    assert.deepStrictEqual(result, undefined);
  });

  it("should return the combination of button presses to get to the prize position (fourth part 2)", () => {
    const input = {
      buttonA: { x: 69, y: 23, tokens: 3 },
      buttonB: { x: 27, y: 71, tokens: 1 },
      prize: { x: 10000000018641, y: 10000000010279 },
    };
    const result = findCombination(input, 100);
    assert.deepStrictEqual(result, undefined);
  });

});

describe("findMinimumTokensToWinPrizes", () => {
  const input = [
    {
      buttonA: { x: 94, y: 34, tokens: 3 },
      buttonB: { x: 22, y: 67, tokens: 1 },
      prize: { x: 8400, y: 5400 },
    },
    {
      buttonA: { x: 26, y: 66, tokens: 3 },
      buttonB: { x: 67, y: 21, tokens: 1 },
      prize: { x: 12748, y: 12176 },
    },
    {
      buttonA: { x: 17, y: 86, tokens: 3 },
      buttonB: { x: 84, y: 37, tokens: 1 },
      prize: { x: 7870, y: 6450 },
    },
    {
      buttonA: { x: 69, y: 23, tokens: 3 },
      buttonB: { x: 27, y: 71, tokens: 1 },
      prize: { x: 18641, y: 10279 },
    },
  ];
  const result = findMinimumTokensToWinPrizes(input);
  assert.deepStrictEqual(result, 480);
});


describe("remapPrizePosition", () => {
  it('should return the position of the prize moved by 10000000000000', () => {
    const input = [
      {
        buttonA: { x: 94, y: 34, tokens: 3 },
        buttonB: { x: 22, y: 67, tokens: 1 },
        prize: { x: 8400, y: 5400 },
      },
      {
        buttonA: { x: 26, y: 66, tokens: 3 },
        buttonB: { x: 67, y: 21, tokens: 1 },
        prize: { x: 12748, y: 12176 },
      },
      {
        buttonA: { x: 17, y: 86, tokens: 3 },
        buttonB: { x: 84, y: 37, tokens: 1 },
        prize: { x: 7870, y: 6450 },
      },
      {
        buttonA: { x: 69, y: 23, tokens: 3 },
        buttonB: { x: 27, y: 71, tokens: 1 },
        prize: { x: 18641, y: 10279 },
      },
    ];
    const result = remapPrizePosition(input);
    assert.deepStrictEqual(result, [
      {
        buttonA: { x: 94, y: 34, tokens: 3 },
        buttonB: { x: 22, y: 67, tokens: 1 },
        prize: { x: 10000000008400, y: 10000000005400 },
      },
      {
        buttonA: { x: 26, y: 66, tokens: 3 },
        buttonB: { x: 67, y: 21, tokens: 1 },
        prize: { x: 10000000012748, y: 10000000012176 },
      },
      {
        buttonA: { x: 17, y: 86, tokens: 3 },
        buttonB: { x: 84, y: 37, tokens: 1 },
        prize: { x: 10000000007870, y: 10000000006450 },
      },
      {
        buttonA: { x: 69, y: 23, tokens: 3 },
        buttonB: { x: 27, y: 71, tokens: 1 },
        prize: { x: 10000000018641, y: 10000000010279 },
      },
    ]);
  });
})
