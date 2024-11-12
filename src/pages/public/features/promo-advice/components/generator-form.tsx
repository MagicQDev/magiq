import { useUserBusinessStore } from "@/stores/user.store";
import { useGetProducts } from "../../products/hooks/use-get-products";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormControlInput from "@/components/custom/app-form-field";
import { Button } from "@/components/ui/button";
import { prompts } from "@/services/ai/prompts";
import generatePrompt from "../utils/generate-prompt";
import { useToastAlerts } from "@/hooks/use-toast-alerts";
import { useMutation } from "@tanstack/react-query";
import generateIGDescription from "@/services/ai/open-ai-service";
import { useState } from "react";
import InstagramPost from "./instagram-post";
import Title from "@/components/app/title";

const ProductForm = z.object({
  product: z.string(),
  about_product: z.string().optional(),
  presentation: z.string().optional(),
  ocasion: z.string().optional(),
  especial_promo: z.string().optional(),
  event: z.string().optional(),
});

function GeneratorForm({ visible }: { visible: boolean | undefined }) {
  const activeCompany = useUserBusinessStore((state) => state.activeCompany);
  const { data: products } = useGetProducts(activeCompany?.id);
  const { setupToastError } = useToastAlerts();
  const [showForm, setShowForm] = useState<boolean>(true);
  const [advice, setAdvice] = useState<string | null>("");
  const form = useForm<z.infer<typeof ProductForm>>({
    resolver: zodResolver(ProductForm),
    mode: "all",
  });

  const mutation = useMutation({
    mutationKey: ["generate_description"],
    mutationFn: async (data: z.infer<typeof ProductForm>) => {
      const prompt = prompts.find((p) => p.socialMedia === "Instagram");
      const productDetail = products?.find(
        (product) => product.id === data.product
      );
      if (productDetail && prompt) {
        const promptRes = generatePrompt(
          prompt,
          data,
          productDetail,
          activeCompany
        );

        return generateIGDescription(promptRes);
      } else {
        throw new Error("Error al generar la descripción");
      }
    },
    onSuccess(data, _variables, _context) {
      if (data.choices) {
        setShowForm(false);
        setAdvice(data.choices[0].message.content);
      }
    },
    onError() {
      setupToastError("Error al generar la descripción");
    },
  });

  const onSubmit = (data: z.infer<typeof ProductForm>) => {
    mutation.mutate(data);
  };

  return (
    <div className={visible ? "flex flex-col w-full" : "hidden"}>
      {showForm && (
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <FormControlInput
              inputType="select"
              label="Producto"
              fieldName="product"
              placeholder="Selecciona un producto"
              description="Selecciona el producto que deseas promocionar"
              required={true}
              options={products}
              optionLabelKey="name"
              optionValueKey="id"
              formControl={form.control}
              formError={form.formState.errors.product?.message}
            />
            <FormControlInput
              inputType="default"
              label="Más sobre el producto"
              fieldName="about_product"
              placeholder="Ej: Delicioso jugo de naranja con toques de limón y endulzado con miel"
              description="¿Cuál es la característica principal del plato?"
              required={true}
              formControl={form.control}
              formError={form.formState.errors.about_product?.message}
            />
            <FormControlInput
              inputType="default"
              label="Presentación"
              fieldName="presentation"
              placeholder="Ej: Decorado con frutas"
              description="¿Cómo se ve el plato? ¿Tiene alguna decoración especial?"
              required={false}
              formControl={form.control}
              formError={form.formState.errors.presentation?.message}
            />
            <FormControlInput
              inputType="default"
              label="Ocasión"
              fieldName="ocasion"
              placeholder="Ej: almuerzo, cena romántica, celebración"
              description="¿Para qué tipo de ocasión es ideal este plato?"
              required={false}
              formControl={form.control}
              formError={form.formState.errors.ocasion?.message}
            />
            <FormControlInput
              inputType="default"
              label="Promoción especial"
              fieldName="especial_promo"
              placeholder="Ej: 2x1, descuento"
              description="¿Hay alguna promoción relacionada con el plato?"
              required={false}
              formControl={form.control}
              formError={form.formState.errors.especial_promo?.message}
            />
            <FormControlInput
              inputType="default"
              label="Evento especial"
              fieldName="event"
              placeholder="Ej: Aniversario, día de la madre"
              description="¿Está relacionado con algún evento especial?"
              required={false}
              formControl={form.control}
              formError={form.formState.errors.event?.message}
            />
            <Button type="submit" className="my-2 w-full">
              Generar descripción
            </Button>
          </form>
        </Form>
      )}
      {advice && (
        <div className="flex flex-col justify-center items-center gap-3">
          <h3 className="font-bold text-card-foreground text-sm">Resultado</h3>
          <InstagramPost
            productImg={
              products?.find(
                (product) => product.id === form.getValues().product
              )?.image_url
            }
            description={advice}
          ></InstagramPost>
          <Button
            variant="outline"
            onClick={() => {
              setShowForm(true);
              setAdvice(null);
            }}
          >
            Volver
          </Button>
        </div>
      )}
    </div>
  );
}

export default GeneratorForm;
