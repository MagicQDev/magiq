import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormControlInput from "@/components/custom/app-form-field";
import { useQuery } from "@tanstack/react-query";
import { getBusinessTypes } from "@/services/business/business-type";
import { NitFieldFormater, PhoneFieldFormater } from "@/utils/validation";
import { Button } from "@/components/ui/button";

const RegisterBusinessFS = z.object({
  name: z
    .string({
      required_error: "Nombre es requerido",
    })
    .min(4, "El nombre debe tener mínimo 4 caracteres")
    .max(255, "El nombre es demasiado largo"),
  description: z.string().optional(),
  // regex to allow numbers and before the last number add -
  nit: z
    .string()
    .max(11, "El NIT debe tener máximo 10 caracteres númericos")
    .regex(/(^[0-9]+-{1}[0-9]{1})/g, "Información no valida")
    .optional(),
  business_type_id: z.string({
    required_error: "Tipo de negocio es requerido",
  }),
  logo: z.instanceof(File).optional(),
  email_contact: z
    .string({
      message: "Email es requerido",
    })
    .email({
      message: "Email no válido",
    }),
  phone_contact: z
    .string({
      message: "Número de teléfono es requerido",
    })
    .min(12, "Número de teléfono no válido")
    .max(12, "Número de teléfono no válido"),
  address: z
    .string({
      message: "Dirección es requerida",
    })
    .min(6, "Dirección no válida"),
  google_maps_url: z.string().optional(),
  social_fb: z.string().optional(),
  social_ig: z.string().optional(),
  social_tw: z.string().optional(),
  social_lin: z.string().optional(),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
});

function RegisterBusinessForm() {
  const { data: options } = useQuery({
    queryKey: ["business_types_list"],
    queryFn: async () => {
      return await getBusinessTypes();
    },
    retry() {
      return false;
    },
    refetchOnMount: false,
  });

  const form = useForm<z.infer<typeof RegisterBusinessFS>>({
    resolver: zodResolver(RegisterBusinessFS),
    mode: "onBlur",
  });
  const onSubmit = (data: z.infer<typeof RegisterBusinessFS>) => {
    console.log({ data });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormControlInput
          type="default"
          label="Nombre"
          fieldName="name"
          required={true}
          placeholder="Nombre de tu negocio"
          description="Ingrese el nombre de su negocio"
          formControl={form.control}
          formError={form.formState.errors.name?.message}
        />
        <div className="grid  md:grid-cols-2 grid-flow-row grid-cols-none w-full gap-4">
          <FormControlInput
            type="select"
            label="Tipo de negocio"
            fieldName="business_type_id"
            placeholder="Selecciona un tipo de negocio"
            description="Escoge el tipo de negocio que mejor se adapte"
            options={options}
            optionLabelKey="name"
            optionValueKey="id"
            required={true}
            formError={form.formState.errors.business_type_id?.message}
            formControl={form.control}
            className="col-span-1"
          ></FormControlInput>
          <FormControlInput
            type="default"
            label="Nit"
            fieldName="nit"
            required={false}
            placeholder="NIT de tu negocio"
            description="Ingrese el número NIT de su negocio, si no tiene déjelo en blanco"
            formControl={form.control}
            onChange={NitFieldFormater}
            formError={form.formState.errors.nit?.message}
            className="col-span-1"
          />
          <FormControlInput
            type="default"
            label="Correo de contacto"
            fieldName="email_contact"
            required={true}
            placeholder="ejemplo@majiq.com"
            description="Ingrese el e-mail de contacto de su negocio"
            formControl={form.control}
            formError={form.formState.errors.email_contact?.message}
            className="col-span-1"
          />
          <FormControlInput
            type="default"
            label="Teléfono de contacto"
            fieldName="phone_contact"
            required={true}
            placeholder="300 123 4567"
            description="Ingrese el número de celular de su negocio"
            formControl={form.control}
            onChange={PhoneFieldFormater}
            formError={form.formState.errors.phone_contact?.message}
            className="col-span-1"
          />
        </div>
        <FormControlInput
          type="default"
          label="Dirección"
          fieldName="address"
          required={true}
          placeholder="KRA 13 #123-45 Bogotá"
          description="Ingrese la dirección de su negocio"
          formControl={form.control}
          formError={form.formState.errors.address?.message}
          className="col-span-1"
        />
        <FormControlInput
          type="default"
          label="Logo"
          fieldName="logo"
          inputType="file"
          accept="image/*"
          required={false}
          placeholder="Logo de tu negocio"
          description="Ingrese el logo de su negocio"
          formControl={form.control}
          onChange={(e) => {
            e.preventDefault();
            form.setValue("logo", e.target.files[0]);
          }}
          formError={form.formState.errors.logo?.message}
          className="col-span-1"
        />
        <Button className="mt-4 w-full" type="submit">
          Guardar
        </Button>
      </form>
    </Form>
  );
}

export default RegisterBusinessForm;
