import { uploadImage } from "@/services/file/images.service";
import { updateProduct } from "@/services/products/products.service";
import { TablesUpdate } from "@/types/supabase-generated.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const productImageFileName = (
  userId: string,
  businessId: string,
  fileExtension: string
) => {
  const uuid = Math.random().toString(36).substring(7);
  return `${userId}/product/${businessId}/${uuid}_product.${fileExtension}`;
};
export const useUpdateProduct = (
  onSuccess: () => void,
  onError: () => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update_product"],
    mutationFn: async ({
      product,
      image,
      userId,
    }: {
      product: TablesUpdate<"business_products">;
      image: File | undefined;
      userId: string;
    }) => {
      if (product.id && product.business_id) {
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
        const isUpdated = await updateProduct(product);
        if (isUpdated) {
          return product;
        }
        throw new Error("Error updating product");
      }
      throw new Error("Product id or business id is missing");
    },
    onSuccess(data, _variables, _context) {
      if (data) {
        queryClient.setQueriesData(
          { queryKey: ["produts_by_business"] },
          (oldData?: any[]) => {
            if (oldData) {
              return oldData.map((oldProduct) =>
                oldProduct.id === data.id
                  ? { ...oldProduct, ...data }
                  : oldProduct
              );
            }
            return [];
          }
        );
        onSuccess();
      }
    },
    onError(error) {
      console.log(error);
      onError();
    },
  });
  return mutation;
};
export const useSwitchProduct = (
  onSuccess: () => void,
  onError: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["switch_product"],
    mutationFn: async ({
      status,
      productId,
    }: {
      status: boolean;
      productId: string;
    }) => {
      const payload: TablesUpdate<"business_products"> = {
        id: productId,
        is_active: status,
      };
      const isUpdated = await updateProduct(payload);
      if (isUpdated) {
        return payload;
      }
      throw new Error("Error updating product");
    },
    onSuccess(data, _variables, _context) {
      queryClient.setQueriesData(
        { queryKey: ["produts_by_business"] },
        (oldData?: any[]) => {
          if (oldData) {
            return oldData.map((product) =>
              product.id === data.id
                ? { ...product, is_active: data.is_active }
                : product
            );
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
};