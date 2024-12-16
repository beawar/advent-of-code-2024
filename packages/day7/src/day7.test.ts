import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getResultWithOperator,
  isValidEquation,
  readAndParseInputFile,
  sumResultsOfValidEquations,
} from "./day7.ts";

describe("readAndParseInputFile", () => {
  it("should create an array of equation objects", async () => {
    const result = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    assert.deepStrictEqual(result, [
      { result: 190, values: [10, 19] },
      { result: 3267, values: [81, 40, 27] },
      { result: 83, values: [17, 5] },
      { result: 156, values: [15, 6] },
      { result: 7290, values: [6, 8, 6, 15] },
      { result: 161011, values: [16, 10, 13] },
      { result: 192, values: [17, 8, 14] },
      { result: 21037, values: [9, 7, 18, 13] },
      { result: 292, values: [11, 6, 16, 20] },
    ]);
  });
});

describe("getResultWithOperator", () => {
  it("should return true the sum of the values with operator +", () => {
    const result = getResultWithOperator(10, 5, "+");
    assert.equal(result, 15);
  });

  it("should return true the product of the values with operator *", () => {
    const result = getResultWithOperator(10, 5, "*");
    assert.equal(result, 50);
  });
});

describe("isValidEquation", () => {
  it("should return true if there is a combination of operators which matches the result", () => {
    const equations = [
      { result: 190, values: [10, 19] },
      { result: 3267, values: [81, 40, 27] },
      { result: 292, values: [11, 6, 16, 20] },
    ];
    equations.forEach((equation) => {
      const result = isValidEquation(equation, ["+", "*"]);
      assert.equal(result, true);
    });
  });

  it("should return false if there is no valid combination of operators to match the result", () => {
    const equations = [
      { result: 83, values: [17, 5] },
      { result: 156, values: [15, 6] },
      { result: 7290, values: [6, 8, 6, 15] },
      { result: 161011, values: [16, 10, 13] },
      { result: 192, values: [17, 8, 14] },
      { result: 21037, values: [9, 7, 18, 13] },
    ];
    equations.forEach((equation) => {
      const result = isValidEquation(equation, ["+", "*"]);
      assert.equal(result, false);
    });
  });
});

describe("sumResultsOfValidEquations", () => {
  it("should return the sum of the results of the valid equations only for the given operators (part 1)", () => {
    const equations = [
      { result: 190, values: [10, 19] },
      { result: 3267, values: [81, 40, 27] },
      { result: 83, values: [17, 5] },
      { result: 156, values: [15, 6] },
      { result: 7290, values: [6, 8, 6, 15] },
      { result: 161011, values: [16, 10, 13] },
      { result: 192, values: [17, 8, 14] },
      { result: 21037, values: [9, 7, 18, 13] },
      { result: 292, values: [11, 6, 16, 20] },
    ];

    const result = sumResultsOfValidEquations(equations, ["+", "*"]);
    assert.equal(result, 3749);
  });

  it("should return the sum of the results of the valid equations only for the given operators (part 2)", () => {
    const equations = [
      { result: 190, values: [10, 19] },
      { result: 3267, values: [81, 40, 27] },
      { result: 83, values: [17, 5] },
      { result: 156, values: [15, 6] },
      { result: 7290, values: [6, 8, 6, 15] },
      { result: 161011, values: [16, 10, 13] },
      { result: 192, values: [17, 8, 14] },
      { result: 21037, values: [9, 7, 18, 13] },
      { result: 292, values: [11, 6, 16, 20] },
    ];

    const result = sumResultsOfValidEquations(equations, ["+", "*", "||"]);
    assert.equal(result, 11387);
  });
});
