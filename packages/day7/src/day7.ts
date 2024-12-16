import { readFileInput } from "utils/src/index.js";

export interface Equation {
  result: number;
  values: number[];
}

export type Operator = "+" | "*" | "||";

export async function readAndParseInputFile(path: string) {
  const equations: Equation[] = [];
  await readFileInput(path, (line) => {
    const [result, ...values] = line.split(/:?\s/);
    equations.push({ result: Number(result), values: values.map(Number) });
  });
  return equations;
}

export function getResultWithOperator(
  value1: number,
  value2: number,
  operator: Operator,
): number {
  switch (operator) {
    case "+":
      return value1 + value2;
    case "*":
      return value1 * value2;
    case "||":
      return Number(`${value1.toString()}${value2.toString()}`);
    default:
      throw new Error("Invalid operator");
  }
}

export function isValidEquation(equation: Equation, operators: Operator[]) {
  let results: number[] = [equation.values[0]];
  for (let i = 1; i < equation.values.length; i++) {
    const nextValue = equation.values[i];
    const nextResults: number[] = [];
    for (const prevResult of results) {
      for (const operator of operators) {
        const newResult = getResultWithOperator(
          prevResult,
          nextValue,
          operator,
        );
        if (newResult <= equation.result) {
          nextResults.push(newResult);
        }
      }
    }
    results = nextResults;
  }
  return results.some((result) => result === equation.result);
}

export function sumResultsOfValidEquations(
  equations: Equation[],
  operators: Operator[],
) {
  return equations.reduce((sum, equation) => {
    if (isValidEquation(equation, operators)) {
      sum += equation.result;
    }
    return sum;
  }, 0);
}
