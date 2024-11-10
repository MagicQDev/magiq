import { ProductForm } from "../utils/product-forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormControlInput from "@/components/custom/app-form-field";
import {
  FORM_PRODUCT_DESCRIPTION,
  FORM_PRODUCT_IMAGE,
  FORM_PRODUCT_NAME,
  FORM_PRODUCT_PRICE,
  FORM_TITLE,
} from "../utils/constants";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useUserBusinessStore } from "@/stores/user.store";
import { getAllCategories } from "@/services/products/categories.service";
import { uploadImage } from "@/services/file/images.service";
import { TablesInsert } from "@/types/supabase-generated.types";
import { useGetProducts, useSaveProduct } from "../hooks/use-products";
import { useToast } from "@/hooks/use-toast";
interface DialogFormProps {
  businessType: "Restaurante" | "Tienda" | "Gym" | "Salon" | "Bar";
  initialValues?: any;
  isNew: boolean;
  isOpen: boolean;
  close: () => void;
}
function MenuForm({
  initialValues,
  businessType,
  isNew,
  isOpen,
  close,
}: DialogFormProps) {
  const activeCompany = useUserBusinessStore((state) => state.activeCompany);
  const user = useUserBusinessStore((state) => state.user);
  const { toast } = useToast();
  const { refetch } = useGetProducts(activeCompany?.id);
  const mutation = useSaveProduct(
    (_data) => {
      setUpToastSuccess("Producto creado correctamente");
      refetch();
    },
    () => {
      setUpToastError("Error al crear el producto");
      console.error("Error to create product");
    }
  );

  const form = useForm<z.infer<typeof ProductForm>>({
    resolver: zodResolver(ProductForm),
    defaultValues: initialValues || {},
    mode: "all",
  });
  const onSubmit = (data: z.infer<typeof ProductForm>) => {
    close();
    if (!user || !activeCompany) return;
    const { image, ...rest } = data;
    let payload: TablesInsert<"business_products"> = {
      ...rest,
      business_id: activeCompany.id,
    };
    console.log("exec mutation", payload);
    mutation.mutate({
      product: payload,
      image: image ? image[0] : undefined,
      userId: user.id,
    });
  };
  const setUpToastError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
      duration: 5000,
    });
  };
  const setUpToastSuccess = (message: string) => {
    toast({
      title: "Exito",
      description: message,
      variant: "default",
      duration: 500,
    });
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          console.log("close modal");
          close();
          form.reset();
        }
      }}
    >
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {isNew
                  ? FORM_TITLE["new"][businessType]
                  : FORM_TITLE["edit"][businessType]}
              </DialogTitle>
              <DialogDescription className="text-card-foreground" asChild>
                <div className="flex flex-col gap-1">
                  <Separator></Separator>
                  <FormControlInput
                    inputType="default"
                    label={FORM_PRODUCT_NAME[businessType]}
                    fieldName="name"
                    required={true}
                    placeholder="Jugo de naranja"
                    description="Nombre de tu producto"
                    formControl={form.control}
                    formError={form.formState.errors.name?.message}
                  />
                  <FormControlInput
                    inputType="default"
                    label={FORM_PRODUCT_DESCRIPTION[businessType]}
                    fieldName="description"
                    required={false}
                    placeholder="Perro caliente con papas"
                    description="Descripción de tu producto"
                    formControl={form.control}
                    formError={form.formState.errors.description?.message}
                  />
                  <div className="grid grid-cols-2 gap-2 grid-flow-row">
                    <FormControlInput
                      inputType="money"
                      label={FORM_PRODUCT_PRICE[businessType]}
                      fieldName="price"
                      placeholder="Precio del producto"
                      description="Precio de tu producto"
                      required={true}
                      formControl={form.control}
                      formError={form.formState.errors.price?.message}
                    />
                    <FormControlInput
                      inputType="select"
                      label="Categoria"
                      fieldName="category_id"
                      placeholder="Categoria"
                      description="Selecciona la categoria de tu producto"
                      required={true}
                      options={getAllCategories(businessType)}
                      optionLabelKey="name"
                      optionValueKey="id"
                      formControl={form.control}
                      formError={form.formState.errors.category_id?.message}
                    />
                  </div>
                  <FormControlInput
                    inputType="file"
                    label={FORM_PRODUCT_IMAGE[businessType]}
                    fieldName="image"
                    description="Imagen de tu producto"
                    accept="image/*"
                    required={false}
                    formControl={form.control}
                    formError={form.formState.errors.image?.message?.toString()}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid}
              >
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default MenuForm;
