type MonthDataType = { month: MonthsIndexes; days: DaysIndexes };

interface createDateProps {
  currentYear: number;
  currentMonthIndex: MonthsIndexes;
  currentDayIndex: DaysIndexes;
  daysCount: number;
  AllLessons?: AllLessons;
}

export const createDate = ({
  currentYear,
  currentMonthIndex,
  currentDayIndex,
  daysCount,
  AllLessons = []
}: createDateProps) => {
  const monthData: MonthDataType[] = [
    { month: 1, days: 31 },
    { month: 2, days: 28 },
    { month: 3, days: 31 },
    { month: 4, days: 30 },
    { month: 5, days: 31 },
    { month: 6, days: 30 },
    { month: 7, days: 31 },
    { month: 8, days: 31 },
    { month: 9, days: 30 },
    { month: 10, days: 31 },
    { month: 11, days: 30 },
    { month: 12, days: 31 }
  ];

  const generateValues = (year: number, monthIndex: number, dayIndex: number, remaining: number): ValuesDates => {
    if (remaining === 0) return [];

    const currentMonth = monthData[monthIndex];
    const daysInCurrentMonth = currentMonth.days;

    if (dayIndex > daysInCurrentMonth) {
      return generateValues(monthIndex === 11 ? year + 1 : year, (monthIndex + 1) % 12, 1, remaining);
    }

    return [
      { year, month: currentMonth.month, day: dayIndex, lessons: AllLessons.length ? AllLessons[remaining - 1] : [] },
      ...generateValues(year, monthIndex, dayIndex + 1, remaining - 1)
    ];
  };

  return generateValues(currentYear, currentMonthIndex - 1, currentDayIndex, daysCount);
};
