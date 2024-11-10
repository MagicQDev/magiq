import { FormField, FormItem } from "../ui/form";
import AppFormLabel from "../app/app-form-label";
import AppFormMessage from "../app/app-form-message";
import { AppFormInput } from "../app/app-form-input";
import { FormFieldType } from "@/types/app.types";

export interface FormControlInputProps
  extends React.HTMLProps<HTMLInputElement> {
  inputType: FormFieldType;
  formControl: any;
  fieldName: string;
  description?: string;
  formError: string | undefined;
  options?: any[];
  optionValueKey?: string;
  optionLabelKey?: string;
}
function FormControlInput({
  formControl,
  fieldName,
  label,
  required,
  formError,
  description,
  ...inputProps
}: FormControlInputProps) {
  return (
    <FormField
      control={formControl}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <AppFormLabel
            label={label || fieldName}
            required={required}
            fieldName={fieldName}
            formError={!!formError}
          />
          <AppFormInput
            {...inputProps}
            field={field}
            formError={formError}
          ></AppFormInput>
          <AppFormMessage description={description} formError={!formError} />
        </FormItem>
      )}
    />
  );
}

export default FormControlInput;
