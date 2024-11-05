export const NitFieldFormater = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  if (value.length > 11) {
    e.target.value = value.slice(0, 11);
    return;
  }
  if (value.length === 9) {
    e.target.value = value + "-";
    return;
  }
  const newValue = value.replace(/[^0-9-]/g, "");
  e.target.value = newValue;
};

export const PhoneFieldFormater = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  if (value.length > 12) {
    e.target.value = value.slice(0, 12);
    return;
  }
  //add a space after 3 numbers
  if (value.length === 3) {
    e.target.value = value + " ";
    return;
  }
  //add a space after 6 numbers note: 3 + 1 space = 4
  if (value.length === 7) {
    e.target.value = value + " ";
    return;
  }
  const newValue = value.replace(/[^0-9 ]/g, "");
  e.target.value = newValue;
};
