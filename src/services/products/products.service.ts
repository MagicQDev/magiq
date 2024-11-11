import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/supabase-generated.types";
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
export const saveProduct = async (
  product: TablesInsert<"business_products">
) => {
  const { data, error } = await supabase
    .from("business_products")
    .insert([product])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data as Tables<"business_products">[];
};

export const updateProduct = async (
  product: TablesUpdate<"business_products">
) => {
  if (product.id) {
    const { error } = await supabase
      .from("business_products")
      .update(product)
      .eq("id", product.id);
    if (error) {
      throw new Error(error.message);
    }
    return true;
  } else {
    throw new Error("Error el id del producto es requerido");
  }
};
