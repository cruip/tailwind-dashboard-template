export const enumToArray = (enumme) =>
  Object.keys(enumme)
    // .filter((value) => Number.isNaN(Number(value)) === false)
    .map((key) => ({ text: enumme[key], value: key }));
