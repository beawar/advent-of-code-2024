import { readFileInput } from "utils/src/index.ts";

export async function readAndParseInputFile(
  path: string,
): Promise<{ rules: [number, number][]; updates: number[][] }> {
  const orderingRules: [number, number][] = [];
  const pageUpdates: number[][] = [];

  await readFileInput(path, (line) => {
    if (line.includes("|")) {
      orderingRules.push(line.split("|").map(Number) as [number, number]);
    } else if (line.includes(",")) {
      pageUpdates.push(line.split(",").map(Number));
    }
  });
  return { rules: orderingRules, updates: pageUpdates };
}

export function isUpdateOrdered(
  input: number[],
  orderedRules: [number, number][],
) {
  return input.slice(0, -1).every((pageValue, index) => {
    return input.slice(index + 1).every((nextValue) => {
      return orderedRules.some(
        (rule) => rule[0] === pageValue && rule[1] === nextValue,
      );
    });
  });
}

export function sumMiddlePages(input: number[][]): number {
  return input.reduce(
    (sum, updateRow) => sum + updateRow[(updateRow.length - 1) / 2],
    0,
  );
}

export function getOrderedUpdates(
  input: number[][],
  orderingRules: [number, number][],
): number[][] {
  return input.filter((update) => isUpdateOrdered(update, orderingRules));
}

export function getUnorderedUpdates(
  input: number[][],
  orderingRules: [number, number][],
): number[][] {
  return input.filter((update) => !isUpdateOrdered(update, orderingRules));
}

export function fixUnorderedUpdate(
  input: number[],
  orderingRules: [number, number][],
) {
  let wrongRule: [number, number] | undefined;
  const fixedInput = [...input];
  do {
    fixedInput.slice(0, -1).some((pageValue, index) => {
      return fixedInput.slice(index + 1).some((nextValue) => {
        wrongRule = orderingRules.find(
          (rule) => rule[1] === pageValue && rule[0] === nextValue,
        );
        return !!wrongRule;
      });
    });
    if (wrongRule) {
      fixedInput[fixedInput.indexOf(wrongRule[0])] = wrongRule[1];
      fixedInput[fixedInput.indexOf(wrongRule[1])] = wrongRule[0];
    }
  } while (wrongRule);

  return fixedInput;
}
