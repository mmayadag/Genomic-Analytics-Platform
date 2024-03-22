export const formatValue = (value: number): string => {
  const formattedValue = value.toFixed(5);
  const decimalPart = formattedValue.split(".")[1];

  if (decimalPart === "00000") {
    return formattedValue.split(".")[0];
  }

  return formattedValue;
};
