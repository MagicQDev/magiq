import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormControlInput from "@/components/custom/app-form-field";
import { NitFieldFormater, PhoneFieldFormater } from "@/utils/validation";
import { Button } from "@/components/ui/button";
import { TablesInsert } from "@/types/supabase-generated.types";
import { useUserBusinessStore } from "@/stores/user.store";
import useBusinessByType from "@/hooks/use-business-by-type";
import { BusinessByOwnerId } from "@/types/business.types";
import { useCreateBusiness } from "../hooks/useCreateBusiness";
import { RegisterBusinessFS } from "../utils/business-forms";

function RegisterBusinessForm({
  onSuccess,
  onError,
}: {
  onSuccess: (data: BusinessByOwnerId[]) => void;
  onError: () => void;
}) {
  const { data: options } = useBusinessByType();
  const user = useUserBusinessStore((state) => state.user);
  const form = useForm<z.infer<typeof RegisterBusinessFS>>({
    resolver: zodResolver(RegisterBusinessFS),
    mode: "all",
  });
  // State to create new business
  const mutation = useCreateBusiness((data) => {
    form.reset();
    onSuccess(data);
  }, onError);

  const onSubmit = (data: z.infer<typeof RegisterBusinessFS>) => {
    if (user === null) return;
    const { logo_file, ...rest } = data;
    const insertValues: TablesInsert<"business"> = {
      ...rest,
      owner_id: user.id,
    };
    mutation.mutate({
      newBusiness: insertValues,
      file: logo_file ? logo_file[0] : undefined,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormControlInput
          inputType="default"
          label="Nombre"
          fieldName="name"
          required={true}
          placeholder="Nombre de tu negocio"
          description="Ingrese el nombre de su negocio"
          formControl={form.control}
          formError={form.formState.errors.name?.message}
        />
        <div className="grid  md:grid-cols-2 grid-flow-row grid-cols-none w-full md:gap-4">
          <FormControlInput
            inputType="select"
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
          {/* TODO: NIT FORMATER*/}
          <FormControlInput
            inputType="default"
            label="Nit"
            fieldName="nit"
            required={false}
            placeholder="NIT de tu negocio"
            description="Ingrese el NIT de su negocio"
            formControl={form.control}
            onChange={NitFieldFormater}
            formError={form.formState.errors.nit?.message}
            className="col-span-1"
          />
          <FormControlInput
            inputType="default"
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
            inputType="default"
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
          inputType="default"
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
          inputType="file"
          label="Logo"
          fieldName="logo_file"
          accept="image/*"
          required={false}
          formControl={form.control}
          className="col-span-1"
          formError={form.formState.errors.logo_file?.message?.toString()}
        />
        <Button
          className="mt-4 w-full"
          type="submit"
          disabled={!form.formState.isValid}
        >
          Guardar
        </Button>
      </form>
    </Form>
  );
}

export default RegisterBusinessForm;
