import { getBusinessTypes } from "@/services/business/business-type.service";
import { useQuery } from "@tanstack/react-query";

export default function useBusinessByType() {
  return useQuery({
    queryKey: ["business_types_list"],
    queryFn: async () => {
      return await getBusinessTypes();
    },
    retry() {
      return false;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}
