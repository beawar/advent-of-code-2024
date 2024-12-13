import {
  getOrderedUpdates,
  readAndParseInputFile,
  sumMiddlePages,
} from "./day5.js";

async function main() {
  const { rules, updates } = await readAndParseInputFile(
    `${import.meta.dirname}/input`,
  );
  const orderedUpdates = getOrderedUpdates(updates, rules);
  return [sumMiddlePages(orderedUpdates)];
}

main()
  .then(console.log)
  .catch((error: unknown) => {
    console.error(error);
  });
