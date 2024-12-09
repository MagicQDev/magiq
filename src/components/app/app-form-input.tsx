import { FormControl } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import React from "react";
import { InputMoney } from "../ui/input-money";
import { AppInputFile } from "./app-input-file";
import { FormControlInputProps } from "../custom/app-form-field";

interface CustomFormContolProps
  extends Omit<Omit<FormControlInputProps, "fieldName">, "formControl"> {}

interface AppFormInputProps extends CustomFormContolProps {
  field: any;
}

export const AppFormInput = React.forwardRef<
  HTMLInputElement,
  AppFormInputProps
>(
  (
    {
      inputType = "default",
      field,
      formError,
      options,
      onChange,
      optionValueKey,
      optionLabelKey,
      placeholder,
      ...rest
    },
    ref
  ) => {
    switch (inputType) {
      case "default":
        return (
          <FormControl>
            <Input
              {...field}
              {...rest}
              value={field.value}
              placeholder={placeholder}
              className={`${formError ? "border-destructive" : ""}`}
              onChange={(e) => {
                onChange?.(e);
                field.onChange(e);
              }}
              ref={ref}
            />
          </FormControl>
        );
      case "select":
        if (!options || !optionValueKey || !optionValueKey || !optionLabelKey)
          return null;
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  className={`${formError ? "border-destructive" : ""}`}
                  placeholder={placeholder}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option: any) => (
                <SelectItem
                  key={option[optionValueKey]}
                  value={option[optionValueKey]}
                >
                  {option[optionLabelKey]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "file":
        return (
          <FormControl>
            <AppInputFile
              {...field}
              value={field.value}
              className={`text-card-foreground ${
                formError ? "border-destructive" : ""
              }`}
              placeholder={placeholder}
              onChange={(e) => {
                onChange?.(e);
                field.onChange(e.target.files);
              }}
            />
          </FormControl>
        );
      case "money":
        return (
          <FormControl>
            <InputMoney
              {...field}
              value={field.value}
              intlConfig={{ locale: "es-CO", currency: "COP" }}
              min={0}
              defaultValue={0}
              decimalsLimit={2}
              allowDecimals={true}
              className={`text-card-foreground ${
                formError ? "border-destructive" : ""
              } `}
              placeholder={placeholder}
              onChange={(e) => {
                e.preventDefault();
              }}
              onValueChange={(_value, _name, values) =>
                field.onChange(values?.float || 0)
              }
            />
          </FormControl>
        );
    }
  }
);
