export const getDaysForOtherCarousels = (values: ValuesDates, slideSize: number) => {
  const new_values = [] as ValuesDates[];

  for (let i = 0; i < values.length; i += slideSize) {
    new_values.push(values.slice(i, i + slideSize));
  }
  return new_values;
};
