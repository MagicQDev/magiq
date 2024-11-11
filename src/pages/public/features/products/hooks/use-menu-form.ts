import { useToastAlerts } from "@/hooks/use-toast-alerts";
import { useUserBusinessStore } from "@/stores/user.store";
import { useEffect, useState } from "react";
import { useSaveProduct } from "./use-products";
import { useUpdateProduct } from "./use-uptate-product";
import { useForm } from "react-hook-form";
import { ProductForm } from "../utils/product-forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TablesInsert } from "@/types/supabase-generated.types";
import { toDataURL } from "@/utils/funtions";

export const useMenuForm = ({
  formValues,
  closeForm,
}: {
  formValues: {
    initialValues?: any;
    isNew: boolean;
    isOpen: boolean;
  };
  closeForm: () => void;
}) => {
  const form = useForm<z.infer<typeof ProductForm>>({
    resolver: zodResolver(ProductForm),
    mode: "all",
  });
  const [formInitialValues, setFormInitialValues] = useState<any>({});
  const activeCompany = useUserBusinessStore((state) => state.activeCompany);
  const user = useUserBusinessStore((state) => state.user);
  const { setupToastError, setupToastSuccess } = useToastAlerts();
  const saveMutation = useSaveProduct(
    () => {
      setupToastSuccess("Producto creado correctamente");
    },
    () => {
      setupToastError("Error al crear el producto");
      console.error("Error to create product");
    }
  );
  const editMutation = useUpdateProduct(
    () => {
      setupToastSuccess("Producto actualizado correctamente");
    },
    () => {
      setupToastError("Error al actualizar el producto");
    }
  );

  const onSubmit = (data: z.infer<typeof ProductForm>) => {
    if (!user || !activeCompany) return;
    const { image, ...rest } = data;
    closeForm();
    if (!formValues.isNew) {
      const changedKeys = validateChanges();
      if (changedKeys.length === 0) {
        setupToastSuccess("No se han realizado cambios");
        return;
      }
      // Get changed keys and values to create object to update
      let updateProduct: any = {};
      let mutateData: any = {};
      changedKeys.forEach((key) => {
        updateProduct[key] = rest[key as keyof typeof rest];
      });
      updateProduct["id"] = formValues.initialValues.id;
      updateProduct["business_id"] = activeCompany.id;
      mutateData["product"] = updateProduct;
      if (changedKeys.find((key) => key === "image")) {
        mutateData["image"] = image ? image[0] : undefined;
      }
      mutateData["userId"] = user.id;
      console.log({ mutateData });
      editMutation.mutate(mutateData);
    } else {
      let payload: TablesInsert<"business_products"> = {
        ...rest,
        business_id: activeCompany.id,
      };
      saveMutation.mutate({
        product: payload,
        image: image ? image[0] : undefined,
        userId: user.id,
      });
    }
  };
  const validateChanges = () => {
    if (formValues.initialValues) {
      const editValues = form.getValues();
      const changes = Object.keys(formInitialValues).filter(
        (key) =>
          formInitialValues[key as keyof typeof formInitialValues] !==
          editValues[key as keyof typeof editValues]
      );
      return changes;
    }
    return [];
  };
  const initialValues = async () => {
    const initialValues = formValues.initialValues;
    form.setValue("name", initialValues.name);
    form.setValue("description", initialValues.description);
    form.setValue("price", initialValues.price);
    form.setValue("category_id", initialValues.category_id);
    if (initialValues.image_url) {
      const imageFile = await toDataURL(initialValues.image_url);
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(imageFile);
      form.setValue("image", dataTransfer.files);
    }
    setFormInitialValues(form.getValues());
  };

  useEffect(() => {
    if (formValues.initialValues && !formValues.isNew) {
      initialValues();
    } else {
      form.reset();
      setFormInitialValues(form.getValues());
    }
  }, [formValues]);

  return { form, onSubmit };
};
