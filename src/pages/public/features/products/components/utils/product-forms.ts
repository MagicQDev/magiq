import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/constants";
import { z } from "zod";

export const ProductForm = z.object({
  name: z
    .string({
      message: "El nombre es requerido",
    })
    .min(6, {
      message: "El nombre debe tener al menos 6 caracteres",
    })
    .max(20, {
      message: "El nombre debe tener como máximo 20 caracteres",
    }),
  description: z.string().optional(),
  price: z.number().nonnegative({
    message: "El precio no es válido",
  }),
  stock: z
    .number()
    .nonnegative({
      message: "El stock debe ser un número positivo",
    })
    .int({
      message: "El stock debe ser un número entero",
    }),
  image: z
    .custom<FileList>((files) => files)
    .refine(
      (files) => {
        if (files.length > 0) {
          return files[0].size < MAX_FILE_SIZE;
        } else {
          return true;
        }
      },
      {
        message: `El tamaño máximo permitido es de ${
          MAX_FILE_SIZE / 1000000
        }MB`,
      }
    )
    .refine(
      (files) => {
        if (files.length > 0) {
          return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
        } else {
          return true;
        }
      },
      {
        message:
          "El formato no es válido, sólo .jpg, .jpeg, .png and .webp son permitidos",
      }
    ),
  is_active: z.boolean().default(true),
});
