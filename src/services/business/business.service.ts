import { BusinessByOwnerId } from "@/types/business.types";
import { supabase } from "../supabase";
export const getBusinessByOwnerId = async (ownerId: string) => {
  const { data, error } = await supabase
    .from("business")
    .select(
      `
        id,
        name,
        owner_id,
        nit,
        logo_url,
        google_maps_url,
        email_contact,
        phone_contact,
        address,
        social_fb,
        social_ig,
        social_tw,
        social_lin,
        primary_color,
        secondary_color,
        business_type(
            id,
            name,
            features:feature_business_type!inner(
                id,
                position,
                data:feature!inner(
                  name,
                  description,
                  app_url,
                  icon,
                  active
                )
              )
          )
      `
    )
    .eq("owner_id", ownerId)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data as BusinessByOwnerId[];
};
export const saveBusiness = async (business: any) => {
  const { data, error } = await supabase
    .from("business")
    .insert(business)
    .select(
      `
        id,
        name,
        owner_id,
        nit,
        logo_url,
        google_maps_url,
        email_contact,
        phone_contact,
        address,
        social_fb,
        social_ig,
        social_tw,
        social_lin,
        primary_color,
        secondary_color,
        business_type(
            id,
            name,
            features:feature_business_type!inner(
                id,
                position,
                data:feature!inner(
                  name,
                  description,
                  app_url,
                  icon,
                  active
                )
              )
          )
      `
    );
  if (error) {
    throw new Error(error.message);
  }
  return data as BusinessByOwnerId[];
};
