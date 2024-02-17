export const enumToArray = (enumme) =>
  Object.keys(enumme)
    // .filter((value) => Number.isNaN(Number(value)) === false)
    .map((key) => ({ text: enumme[key], value: key }));

export const formattedAmountWithNaira = (amount, dp = 2) => {
  return amount
    ? "\u20A6" +
        new Intl.NumberFormat("en-NG", {
          minimumFractionDigits: dp,
          maximumFractionDigits: dp,
          // style: "currency",
          // currency: "NGN",
        }).format(amount)
    : "";
};
