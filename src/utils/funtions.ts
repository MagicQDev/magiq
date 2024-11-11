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

export const toDataURL = (url: string) =>
  fetch(url).then(async (response) => {
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();
    const name = "imagen" + "." + contentType?.split("/")[1];
    const file = new File([blob], name, {
      type: contentType || "application/octet-stream",
    });
    return file;
    // access file here
  });
