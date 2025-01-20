export const findIndexByDate = (arr: CustomDates, target: CustomDate) =>
  arr.findIndex((item) => item.month === target.month && item.day === target.day && item.year === target.year);
