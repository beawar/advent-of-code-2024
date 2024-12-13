import {
  fixUnorderedUpdate,
  getOrderedUpdates,
  getUnorderedUpdates,
  readAndParseInputFile,
  sumMiddlePages,
} from "./day5.js";

async function main() {
  const { rules, updates } = await readAndParseInputFile(
    `${import.meta.dirname}/input`,
  );
  const orderedUpdates = getOrderedUpdates(updates, rules);
  const unOrderedUpdates = getUnorderedUpdates(updates, rules);
  const fixedUpdates = unOrderedUpdates.map((update) =>
    fixUnorderedUpdate(update, rules),
  );
  return [sumMiddlePages(orderedUpdates), sumMiddlePages(fixedUpdates)];
}

main()
  .then(console.log)
  .catch((error: unknown) => {
    console.error(error);
  });
