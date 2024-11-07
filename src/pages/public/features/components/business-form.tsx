import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormControlInput from "@/components/custom/app-form-field";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBusinessTypes } from "@/services/business/business-type";
import { NitFieldFormater, PhoneFieldFormater } from "@/utils/validation";
import { Button } from "@/components/ui/button";
import { saveBusiness } from "@/services/business/business";
import { Tables } from "@/types/supabase-generated.types";
import { useUserBusinessStore } from "@/stores/user.store";
import { RegisterBusinessFS } from "../utils/business-forms";
import { useToast } from "@/hooks/use-toast";

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
  const user = useUserBusinessStore((state) => state.user);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof RegisterBusinessFS>>({
    resolver: zodResolver(RegisterBusinessFS),
    mode: "onBlur",
  });
  const mutation = useMutation({
    mutationFn: async (newBusiness: Tables<"business">) => {
      return await saveBusiness(newBusiness);
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Negocio registrado",
        description: "Tu negocio ha sido registrado satisfactoriamente",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterBusinessFS>) => {
    if (user === null) return;
    const values = data as Tables<"business">;
    values.owner_id = user.id;
    mutation.mutate(values);
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
            value={form.watch("phone_contact")}
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
