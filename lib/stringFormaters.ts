export const dateTimeToDisplay = (unformatedDate: string):string => {
  const dateObj = new Date(unformatedDate);
  const y = String(dateObj.getFullYear()).slice(-2);
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  const h = String(dateObj.getHours()).padStart(2, '0');
  const min = String(dateObj.getMinutes()).padStart(2, '0');

  return `${y}.${m}.${d} / ${h}:${min}`;
};

export const dateToDisplay = (unformatedDate: string):string => {
  const dateObj = new Date(unformatedDate);
  const y = String(dateObj.getFullYear()).slice(-2);
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');

  return `${y}.${m}.${d}`;
};
