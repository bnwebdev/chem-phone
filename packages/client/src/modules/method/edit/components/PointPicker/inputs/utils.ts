export const getNumber = (value: string) => {
  const numValue = +value;

  return Number.isNaN(numValue) ? undefined : numValue;
};
