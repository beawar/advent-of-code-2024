import {describe, it} from "node:test";
import assert from "node:assert/strict";
import {calculateDistance, readAndParseInputFile} from "./day1.ts";

describe("Day 1", () => {
    it('should return 0 if the input arrays are empty', () => {
        const result = calculateDistance([], []);
        assert.equal(result, 0);
    });

    it('should throw if the inputs have different lengths', () => {
        assert.throws(() => calculateDistance([1, 2], [1]), Error('inputs have different lengths'));
    });

    it('should return the distance between the values on inputs of length 1 and input1 values is lower than input2 value', () => {
        const result = calculateDistance([2], [5]);
        assert.equal(result, 3);
    });

    it('should return 0 on inputs of length 1 with the same value', () => {
        const result = calculateDistance([2], [2]);
        assert.equal(result, 0);
    });

    it('should return the distance between the values on inputs of length 1 and input1 values is greater than input2 value', () => {
        const result = calculateDistance([5], [2]);
        assert.equal(result, 3);
    });

    it('should return the distance between the incrementally lowest values couples', () => {
        const result = calculateDistance([5, 1], [2, 9]);
        assert.equal(result, 5)
    });

    describe('readAndParseInputFile', () => {
        it('should return two arrays with the two columns of the file respectively', async () => {
            const expectedInput1 = [5, 1, 3, 4, 9];
            const expectedInput2 = [7, 8, 6, 5, 0];
            console.log(import.meta.dirname)
            const [resultInput1, resultInput2] = await readAndParseInputFile(`${import.meta.dirname}/input-test`)
            assert.deepStrictEqual(resultInput1, expectedInput1);
            assert.deepStrictEqual(resultInput2, expectedInput2);
        })
    })
})
