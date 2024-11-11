import { uploadImage } from "@/services/file/images.service";
import { saveProduct } from "@/services/products/products.service";
import { Tables, TablesInsert } from "@/types/supabase-generated.types";
import { useMutation } from "@tanstack/react-query";

export const productImageFileName = (
  userId: string,
  businessId: string,
  fileExtension: string
) => {
  const uuid = Math.random().toString(36).substring(7);
  return `${userId}/product/${businessId}/${uuid}_product.${fileExtension}`;
};
export const useSaveProduct = (
  onSuccess: (data: Tables<"business_products">[]) => void,
  onError: () => void
) => {
  const mutation = useMutation({
    mutationKey: ["add_product"],
    mutationFn: async ({
      product,
      image,
      userId,
    }: {
      product: TablesInsert<"business_products">;
      image: File | undefined;
      userId: string;
    }) => {
      if (image) {
        const response = await uploadImage(
          image,
          productImageFileName(
            userId,
            product.business_id,
            image.name.split(".").pop() || "png"
          )
        );
        product.image_url = response;
      }
      return await saveProduct(product);
    },
    onSuccess(data, _variables, _context) {
      onSuccess(data);
    },
    onError() {
      onError();
    },
  });
  return mutation;
};
