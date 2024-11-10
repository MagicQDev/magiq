export const getValue = (alt: object | undefined, key: string) => {
  if (alt) {
    return alt[key as keyof typeof alt];
  } else {
    return "";
  }
};
export const maskedPrice = (price: number) => {
  return price.toLocaleString("es-Co", {
    style: "currency",
    currency: "COP",
  });
};