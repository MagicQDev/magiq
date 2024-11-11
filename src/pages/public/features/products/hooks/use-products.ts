import { uploadImage } from "@/services/file/images.service";
import { saveProduct } from "@/services/products/products.service";
import { TablesInsert } from "@/types/supabase-generated.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const productImageFileName = (
  userId: string,
  businessId: string,
  fileExtension: string
) => {
  const uuid = Math.random().toString(36).substring(7);
  return `${userId}/product/${businessId}/${uuid}_product.${fileExtension}`;
};
export const useSaveProduct = (onSuccess: () => void, onError: () => void) => {
  const queryClient = useQueryClient();
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
      // return array of products
      return await saveProduct(product);
    },
    onSuccess(data, _variables, _context) {
      queryClient.setQueriesData(
        { queryKey: ["produts_by_business"] },
        (oldData?: any[]) => {
          if (oldData) {
            return [...oldData, ...data];
          }
          return [];
        }
      );
      onSuccess();
    },
    onError() {
      onError();
    },
  });
  return mutation;
};
