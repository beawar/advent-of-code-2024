import { readFileInput } from "utils";

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
