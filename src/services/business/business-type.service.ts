import { Tables } from "@/types/supabase-generated.types";
import { supabase } from "../supabase";

export const getBusinessTypes = async () => {
  const { data, error } = await supabase
    .from("business_type")
    .select("*")
    .returns<Tables<"business_type">[]>();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
