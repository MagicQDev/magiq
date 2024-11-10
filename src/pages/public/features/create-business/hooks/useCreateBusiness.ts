import { saveBusiness } from "@/services/business/business.service";
import { uploadImage } from "@/services/file/images.service";
import { BusinessByOwnerId } from "@/types/business.types";
import { TablesInsert } from "@/types/supabase-generated.types";
import { useMutation } from "@tanstack/react-query";

export const businessFileName = (
  userId: string,
  businesName: string,
  fileExtension: string
) => {
  const hashName = businesName.replace(/ /g, "_");
  return `${userId}/${hashName}/logo.${fileExtension}`;
};

export const useCreateBusiness = (
  onSuccess: (data: BusinessByOwnerId[]) => void,
  onError: () => void
) => {
  const mutation = useMutation({
    mutationFn: async ({
      newBusiness,
      file,
    }: {
      newBusiness: TablesInsert<"business">;
      file: File | undefined;
    }) => {
      if (file) {
        const response = await uploadImage(
          file,
          businessFileName(
            newBusiness.owner_id,
            newBusiness.name,
            file.name.split(".").pop() || "png"
          )
        );
        newBusiness.logo_url = response;
      }
      return await saveBusiness(newBusiness);
    },
    onSuccess: (data: BusinessByOwnerId[]) => {
      onSuccess(data);
    },
    onError: () => {
      onError();
    },
  });
  return mutation;
};
