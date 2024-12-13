import { describe, it } from "node:test";
import {
  findCrossMatches,
  findMatches,
  isCrossMatch,
  isMatch,
  readAndParseInputFile,
} from "./day4.ts";
import assert from "node:assert/strict";

describe("readAndParseInputFile", () => {
  it("should return a matrix from the chars of the input", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    const expected = [
      ["M", "M", "M", "S", "X", "X", "M", "A", "S", "M"],
      ["M", "S", "A", "M", "X", "M", "S", "M", "S", "A"],
      ["A", "M", "X", "S", "X", "M", "A", "A", "M", "M"],
      ["M", "S", "A", "M", "A", "S", "M", "S", "M", "X"],
      ["X", "M", "A", "S", "A", "M", "X", "A", "M", "M"],
      ["X", "X", "A", "M", "M", "X", "X", "A", "M", "A"],
      ["S", "M", "S", "M", "S", "A", "S", "X", "S", "S"],
      ["S", "A", "X", "A", "M", "A", "S", "A", "A", "A"],
      ["M", "A", "M", "M", "M", "X", "M", "M", "M", "M"],
      ["M", "X", "M", "X", "A", "X", "M", "A", "S", "X"],
    ];
    assert.deepStrictEqual(result, expected);
  });
});

describe("findMatches", () => {
  it("should return the number of xmas strings present in any direction", () => {
    const input = [
      ["M", "M", "M", "S", "X", "X", "M", "A", "S", "M"],
      ["M", "S", "A", "M", "X", "M", "S", "M", "S", "A"],
      ["A", "M", "X", "S", "X", "M", "A", "A", "M", "M"],
      ["M", "S", "A", "M", "A", "S", "M", "S", "M", "X"],
      ["X", "M", "A", "S", "A", "M", "X", "A", "M", "M"],
      ["X", "X", "A", "M", "M", "X", "X", "A", "M", "A"],
      ["S", "M", "S", "M", "S", "A", "S", "X", "S", "S"],
      ["S", "A", "X", "A", "M", "A", "S", "A", "A", "A"],
      ["M", "A", "M", "M", "M", "X", "M", "M", "M", "M"],
      ["M", "X", "M", "X", "A", "X", "M", "A", "S", "X"],
    ];
    const result = findMatches(input);
    assert.equal(result, 18);
  });
});

describe("isMatch", () => {
  describe("right direction", () => {
    it("should return true if the values on the right matches the given chars", () => {
      const input = [[".", "X", "M", "A", "S", "."]];
      const result = isMatch(input, 1, 0, ["M", "A", "S"], "right");
      assert.equal(result, true);
    });

    it("should return false if the values on the right do not match exactly the given chars", () => {
      const input = [[".", "X", "M", "A", ".", "S", "."]];
      const result = isMatch(input, 1, 0, ["M", "A", "S"], "right");
      assert.equal(result, false);
    });
  });

  describe("left direction", () => {
    it("should return true if the values on the right matches the given chars", () => {
      const input = [[".", "S", "A", "M", "X", "."]];
      const result = isMatch(input, 4, 0, ["M", "A", "S"], "left");
      assert.equal(result, true);
    });

    it("should return false if the values on the right do not match exactly the given chars", () => {
      const input = [["M", "X", "M", "A", "S", "."]];
      const result = isMatch(input, 1, 0, ["M", "A", "S"], "left");
      assert.equal(result, false);
    });
  });

  describe("top direction", () => {
    it("should return true if the values on the right matches the given chars", () => {
      const input = [["."], ["S"], ["A"], ["M"], ["X"], ["."]];
      const result = isMatch(input, 0, 4, ["M", "A", "S"], "top");
      assert.equal(result, true);
    });

    it("should return false if the values on the right do not match exactly the given chars", () => {
      const input = [["M"], ["X"], ["M"], ["A"], ["S"], ["."]];
      const result = isMatch(input, 0, 1, ["M", "A", "S"], "top");
      assert.equal(result, false);
    });
  });

  describe("bottom direction", () => {
    it("should return true if the values on the right matches the given chars", () => {
      const input = [["."], ["X"], ["M"], ["A"], ["S"], ["."]];
      const result = isMatch(input, 0, 1, ["M", "A", "S"], "bottom");
      assert.equal(result, true);
    });

    it("should return false if the values on the right do not match exactly the given chars", () => {
      const input = [["S"], ["A"], ["M"], ["X"], ["M"], ["A"]];
      const result = isMatch(input, 0, 3, ["M", "A", "S"], "bottom");
      assert.equal(result, false);
    });
  });

  describe("top left direction", () => {
    it("should return true if the values on the right matches the given chars", () => {
      const input = [
        ["S", ".", ".", "."],
        [".", "A", ".", "."],
        [".", ".", "M", "."],
        [".", ".", ".", "X"],
      ];
      const result = isMatch(input, 3, 3, ["M", "A", "S"], "topLeft");
      assert.equal(result, true);
    });

    it("should return false if the values on the right do not match exactly the given chars", () => {
      const input = [
        [".", ".", ".", "."],
        [".", "A", ".", "."],
        [".", ".", "M", "."],
        [".", ".", ".", "X"],
      ];
      const result = isMatch(input, 3, 3, ["M", "A", "S"], "topLeft");
      assert.equal(result, false);
    });
  });

  describe("top right direction", () => {
    it("should return true if the values on the right matches the given chars", () => {
      const input = [
        [".", ".", ".", "S"],
        [".", ".", "A", "."],
        [".", "M", ".", "."],
        ["X", ".", ".", "."],
      ];
      const result = isMatch(input, 0, 3, ["M", "A", "S"], "topRight");
      assert.equal(result, true);
    });

    it("should return false if the values on the right do not match exactly the given chars", () => {
      const input = [
        ["S", ".", ".", "."],
        [".", "A", ".", "."],
        [".", ".", "M", "."],
        [".", ".", ".", "X"],
      ];
      const result = isMatch(input, 3, 3, ["M", "A", "S"], "topRight");
      assert.equal(result, false);
    });
  });

  describe("bottom right direction", () => {
    it("should return true if the values on the right matches the given chars", () => {
      const input = [
        ["X", ".", ".", "."],
        [".", "M", ".", "."],
        [".", ".", "A", "."],
        [".", ".", ".", "S"],
      ];
      const result = isMatch(input, 0, 0, ["M", "A", "S"], "bottomRight");
      assert.equal(result, true);
    });

    it("should return false if the values on the right do not match exactly the given chars", () => {
      const input = [
        ["X", ".", ".", "."],
        [".", "M", ".", "."],
        [".", ".", "A", "."],
        [".", ".", ".", "X"],
      ];
      const result = isMatch(input, 0, 0, ["M", "A", "S"], "bottomRight");
      assert.equal(result, false);
    });
  });

  describe("bottom left direction", () => {
    it("should return true if the values on the right matches the given chars", () => {
      const input = [
        [".", ".", ".", "X"],
        [".", ".", "M", "."],
        [".", "A", ".", "."],
        ["S", ".", ".", "."],
      ];
      const result = isMatch(input, 3, 0, ["M", "A", "S"], "bottomLeft");
      assert.equal(result, true);
    });

    it("should return false if the values on the right do not match exactly the given chars", () => {
      const input = [
        ["X", "M", "A", "S"],
        ["M", "M", ".", "."],
        ["A", ".", "A", "."],
        ["S", ".", ".", "S"],
      ];
      const result = isMatch(input, 0, 0, ["M", "A", "S"], "bottomLeft");
      assert.equal(result, false);
    });
  });
});

describe("isCrossMatch", () => {
  it("should return false if given coordinates are not an A", () => {
    const input = [
      ["M", ".", "S", "M"],
      [".", "S", ".", "M"],
      ["M", "S", "S", "M"],
      ["M", ".", "A", "M"],
      ["M", "S", "S", "M"],
    ];
    const result = isCrossMatch(input, 1, 2);
    assert.equal(result, false);
  });
  it("should return true if the corner values around an A are S or M", () => {
    const input = [
      ["M", ".", "S"],
      [".", "A", "."],
      ["M", ".", "S"],
    ];
    const result = isCrossMatch(input, 1, 1);
    assert.equal(result, true);
  });

  it("should return false if at least one value on the corners is not M or S", () => {
    const input = [
      [".", "M", "S"],
      ["S", "A", "M"],
      ["M", "S", "S"],
    ];
    const result = isCrossMatch(input, 1, 1);
    assert.equal(result, false);
  });

  it("should return false if the diagonal values are not MAS or SAM", () => {
    const input = [
      ["M", "M", "M"],
      ["M", "A", "M"],
      ["S", "M", "M"],
    ];
    const result = isCrossMatch(input, 1, 1);
    assert.equal(result, false);
  });
});

describe("findCrossMatches", () => {
  it("should return the number of valid MAS crosses", () => {
    const input = [
      [".", "M", ".", "S", ".", ".", ".", ".", ".", "."],
      [".", ".", "A", ".", ".", "M", "S", "M", "S", "."],
      [".", "M", ".", "S", ".", "M", "A", "A", ".", "."],
      [".", ".", "A", ".", "A", "S", "M", "S", "M", "."],
      [".", "M", ".", "S", ".", "M", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ["S", ".", "S", ".", "S", ".", "S", ".", "S", "."],
      [".", "A", ".", "A", ".", "A", ".", "A", ".", "."],
      ["M", ".", "M", ".", "M", ".", "M", ".", "M", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];
    const result = findCrossMatches(input);
    assert.equal(result, 9);
  });

  it("should return the number of valid MAS crosses", () => {
    const input = [
      ["M", ".", "S"],
      [".", "A", "."],
      ["M", ".", "S"],
    ];
    const result = findCrossMatches(input);
    assert.equal(result, 1);
  });
});
