export const scheduleMatrixCreate = (values: ValuesDates, slideSize: number) => {
  const newValues: ValuesDates[] = [];

  for (let i = 0; i < values.length; i += slideSize) {
    newValues.push(values.slice(i, i + slideSize));
  }
  return newValues;
};
