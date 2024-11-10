export const getValue = (alt: object | undefined, key: string) => {
  if (alt) {
    return alt[key as keyof typeof alt];
  } else {
    return "";
  }
};