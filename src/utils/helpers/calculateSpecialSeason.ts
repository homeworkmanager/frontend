const isNewYearPeriod = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return (month === 12 && day >= 15) || (month === 1 && day <= 15);
};

export const isSpecialSeason = () => {
  if (isNewYearPeriod()) return 'NewYear';

  return false;
};
