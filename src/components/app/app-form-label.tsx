import { FormLabel } from "../ui/form";

function AppFormLabel({
  label,
  fieldName,
  required = false,
  formError = false,
}: {
  label: string;
  fieldName: string;
  required?: boolean;
  formError?: boolean;
}) {
  return (
    <FormLabel
      className={`flex items-center my-2 ${
        formError ? "text-destructive" : "text-card-foreground"
      }`}
      htmlFor={fieldName}
    >
      {label}
      {required == true && (
        <span
          className={`"text-[12px] sm:text-[10px] leading-none font-normal ml-1 text-center align-middle ${
            formError ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          (Campo obligatorio)
        </span>
      )}
    </FormLabel>
  );
}

export default AppFormLabel;
