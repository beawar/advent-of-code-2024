import { readFileInput } from "utils/src/index.js";

export interface Equation {
  result: number;
  values: number[];
}

export type Operator = "+" | "*";

export async function readAndParseInputFile(path: string) {
  const equations: Equation[] = [];
  await readFileInput(path, (line) => {
    const [result, ...values] = line.split(/:?\s/);
    equations.push({ result: Number(result), values: values.map(Number) });
  });
  return equations;
}

export function checkResultWithOperators(
  equations: Equation,
  operators: Operator[],
) {
  if (operators.length !== equations.values.length - 1) {
    throw new Error("Invalid length of operators");
  }

  let result = equations.values[0];
  let index = 1;
  while (result < equations.result && index < equations.values.length) {
    const operator = operators[index - 1];
    if (operator === "+") {
      result += equations.values[index];
    }
    if (operator === "*") {
      result *= equations.values[index];
    }
    index += 1;
  }
  return result === equations.result;
}

export function isValidEquation(equation: Equation) {
  let results: number[] = [equation.values[0]];
  for (let i = 1; i < equation.values.length; i++) {
    const nextValue = equation.values[i];
    const nextResults: number[] = [];
    for (const prevResult of results) {
      if (prevResult + nextValue <= equation.result) {
        nextResults.push(prevResult + nextValue);
      }
      if (prevResult * nextValue <= equation.result) {
        nextResults.push(prevResult * nextValue);
      }
    }
    results = nextResults;
  }
  return results.some((result) => result === equation.result);
}

export function sumResultsOfValidEquations(equations: Equation[]) {
  return equations.reduce((sum, equation) => {
    if (isValidEquation(equation)) {
      sum += equation.result;
    }
    return sum;
  }, 0);
}
