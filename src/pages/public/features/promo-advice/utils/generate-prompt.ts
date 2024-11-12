function generatePrompt(
  prompt: any,
  data: any,
  productDetail: any,
  activeCompany: any
) {
  prompt.keys.forEach((key: string) => {
    if (key === "product_name") {
      prompt.prompt = prompt.prompt.replace(`[${key}]`, productDetail.name);
    }
    if (key === "product_description") {
      prompt.prompt = prompt.prompt.replace(
        `[${key}]`,
        productDetail.description
      );
    }
    if (key === "sabor_destacado") {
      prompt.prompt = prompt.prompt.replace(
        new RegExp(`\\[${key}\\]`, "g"),
        data.about_product || "NO APLICA"
      );
    }
    if (key === "presentacion") {
      prompt.prompt = prompt.prompt.replace(
        `[${key}]`,
        data.presentation || "NO APLICA"
      );
    }
    if (key === "ocasion") {
      prompt.prompt = prompt.prompt.replace(
        `[${key}]`,
        data.ocasion || "NO APLICA"
      );
    }
    if (key === "ubicacion") {
      prompt.prompt = prompt.prompt.replace(
        `[${key}]`,
        activeCompany?.address || "NO APLICA"
      );
    }
    if (key === "nombredelrestaurante") {
      prompt.prompt = prompt.prompt.replace(
        new RegExp(`\\[${key}\\]`, "g"),
        activeCompany?.name || "NO APLICA"
      );
    }
    if (key === "promocion_especial") {
      prompt.prompt = prompt.prompt.replace(
        `[${key}]`,
        data.especial_promo || "NO APLICA"
      );
    }
    if (key === "evento") {
      prompt.prompt = prompt.prompt.replace(
        `[${key}]`,
        data.event || "NO APLICA"
      );
    }
    if (key === "cantidad_resultados") {
      prompt.prompt = prompt.prompt.replace(`[${key}]`, "1");
    }
  });
  return prompt.prompt;
}
export default generatePrompt;
