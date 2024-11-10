import { supabase } from "../supabase";

export const uploadImage = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from("magiq_images")
    .upload(path, file, { upsert: true });
  if (error) {
    throw Error(error.message);
  } else {
    const res = supabase.storage.from("magiq_images").getPublicUrl(data.path);
    return res.data.publicUrl;
  }
};
