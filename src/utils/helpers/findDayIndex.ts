export const findDayIndex = (day: CustomDate, daysByMonth: CustomDatesByWeeks) => {
  const result = [-1, -1];
  daysByMonth.forEach((value, index) => {
    const dayIndex = value
      .map((value) => {
        return `${value.year}-${value.month}-${value.day}`;
      })
      .indexOf(`${day.year}-${day.month}-${day.day}`);

    if (dayIndex !== -1) {
      result[0] = index;
      result[1] = dayIndex;
    }
  });
  return result;
};
