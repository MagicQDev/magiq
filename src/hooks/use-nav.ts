import { getBusinessByOwnerId } from "@/services/business/business";
import { useQuery } from "@tanstack/react-query";

export default function useFetchNav({
  owner_id,
}: {
  owner_id: string | undefined;
}) {
  return useQuery({
    queryKey: ["nav", owner_id],
    queryFn: async () => {
      if (!owner_id) return;
      return await getBusinessByOwnerId(owner_id);
    },
    retry() {
      return false;
    },
    refetchOnMount: false,
    enabled: !!owner_id,
  });
}
