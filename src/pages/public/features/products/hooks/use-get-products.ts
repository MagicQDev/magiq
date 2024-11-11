import { fetchAllProductsByBusiness } from "@/services/products/products.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (business_id: string | undefined) => {
  return useQuery({
    queryKey: ["produts_by_business", business_id],
    queryFn: async () => {
      if (!business_id) return;
      return await fetchAllProductsByBusiness(business_id);
    },
    retry() {
      return false;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: !!business_id,
  });
};
