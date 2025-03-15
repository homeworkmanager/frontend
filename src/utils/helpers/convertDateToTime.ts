export const convertDateToTime = (rawDate: string) => {
  return new Date(rawDate).toLocaleTimeString('ru-Ru', { hour: '2-digit', minute: '2-digit' });
};
