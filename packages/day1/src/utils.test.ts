import { describe, it } from "node:test";
import { readAndParseInputFile } from "./utils.js";
import assert from "node:assert/strict";

describe("readAndParseInputFile", () => {
  it("should return two arrays with the two columns of the file respectively", async () => {
    const expectedInput1 = [5, 1, 3, 4, 9];
    const expectedInput2 = [7, 8, 6, 5, 0];
    console.log(import.meta.dirname);
    const [resultInput1, resultInput2] = await readAndParseInputFile(
      `${import.meta.dirname}/input-test`,
    );
    assert.deepStrictEqual(resultInput1, expectedInput1);
    assert.deepStrictEqual(resultInput2, expectedInput2);
  });
});
