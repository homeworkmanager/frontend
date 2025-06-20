export const scheduleMatrixFindIndexes = (date: CustomDate, daysByMonth: CustomDatesByWeeks) => {
  const result = [-1, -1];

  for (const [index, value] of daysByMonth.entries()) {
    const dayIndex = value
      .map((currentDate) => {
        return `${currentDate.year}-${currentDate.month}-${currentDate.day}`;
      })
      .indexOf(`${date.year}-${date.month}-${date.day}`);

    if (dayIndex !== -1) {
      result[0] = index;
      result[1] = dayIndex;
      break;
    }
  }
  return result;
};
