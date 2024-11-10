import { ProductForm } from "./utils/product-forms";
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
} from "./utils/constants";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
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
  const form = useForm<z.infer<typeof ProductForm>>({
    resolver: zodResolver(ProductForm),
    defaultValues: initialValues || {},
    mode: "onBlur",
  });
  const onSubmit = (data: z.infer<typeof ProductForm>) => {
    if (data.image) {
    }
    console.log(data);
  };
  useEffect(() => {
    console.log({ formValues: form.getValues() });
  }, [form.getValues()]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) {
              close();
            }
          }}
        >
          <DialogContent>
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
                    placeholder="Nombre del producto"
                    formControl={form.control}
                    formError={form.formState.errors.name?.message}
                  />
                  <FormControlInput
                    inputType="default"
                    label={FORM_PRODUCT_DESCRIPTION[businessType]}
                    fieldName="description"
                    required={true}
                    placeholder="Perro caliente con papas"
                    formControl={form.control}
                    formError={form.formState.errors.description?.message}
                  />

                  <FormControlInput
                    inputType="money"
                    label={FORM_PRODUCT_PRICE[businessType]}
                    fieldName="price"
                    placeholder="Precio del producto"
                    required={true}
                    formControl={form.control}
                    formError={form.formState.errors.price?.message}
                  />
                  <FormControlInput
                    inputType="file"
                    label={FORM_PRODUCT_IMAGE[businessType]}
                    fieldName="image"
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
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}

export default MenuForm;
