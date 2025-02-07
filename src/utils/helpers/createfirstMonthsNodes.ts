type uniqData = [number, number][];

export const createfirstMonthsNodes = (values: CustomDates) => {
  const new_values = [] as uniqData;
  const uniqueMonths = new Set();

  for (let i = 0; i < values.length; i++) {
    if (!uniqueMonths.has(values[i].month)) {
      uniqueMonths.add(values[i].month);
      new_values.push([values[i].month, i]);
    }
  }
  return new_values;
};
