import { Tables } from "@/types/supabase-generated.types";
import { supabase } from "../supabase";

export const fetchAllProductsByBusiness = async (business_id: string) => {
  const { data, error } = await supabase
    .from("business_products")
    .select("*")
    .eq("business_id", business_id);
  if (error) {
    throw Error(error.message);
  }
  return data as Tables<"business_products">[];
};
export const saveProduct = async (product: Tables<"business_products">) => {
  return await supabase.from("business_products").insert([product]).select();
};
