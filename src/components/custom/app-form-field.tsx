import { FormField, FormItem } from "../ui/form";
import AppFormLabel from "../app/app-form-label";
import AppFormMessage from "../app/app-form-message";
import { AppFormInput } from "../app/app-form-input";

interface FormControlInputProps extends React.HTMLProps<HTMLDivElement> {
  formControl: any;
  fieldName: string;
  label: string;
  type?: "select" | "default" | "file";
  placeholder?: string;
  description?: string;
  options?: any[];
  formError?: string;
  required: boolean;
  optionLabelKey?: string;
  optionValueKey?: string;
  inputType?: "text" | "email" | "password" | "file";
  accept?: string;
  onChange?: (e: any) => void;
}
function FormControlInput({
  formControl,
  fieldName,
  label,
  type = "default",
  placeholder,
  description = "",
  options = [],
  formError,
  required = false,
  optionLabelKey = "",
  optionValueKey = "",
  onChange = () => {},
  className,
  inputType,
  accept,
}: FormControlInputProps) {
  return (
    <FormField
      control={formControl}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <AppFormLabel
            label={label}
            required={required}
            fieldName={fieldName}
            formError={!!formError}
          />
          <AppFormInput
            {...field}
            type={type}
            placeholder={placeholder}
            options={options}
            formError={formError}
            optionLabelKey={optionLabelKey}
            optionValueKey={optionValueKey}
            inputType={inputType}
            accept={accept}
            onChange={onChange}
            className={className}
            field={field}
          ></AppFormInput>
          <AppFormMessage description={description} formError={!formError} />
        </FormItem>
      )}
    />
  );
}

export default FormControlInput;
