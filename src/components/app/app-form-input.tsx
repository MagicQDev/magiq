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

interface AppFormInputProps extends React.HTMLProps<HTMLInputElement> {
  type?: "default" | "select" | "file";
  field: any;
  value?: any;
  formError: string | undefined;
  placeholder: string | undefined;
  options: any[];
  optionValueKey: string;
  optionLabelKey: string;
  inputType?: "text" | "email" | "password" | "file";
  accept?: string;
  onChange: (e: any) => void;
}

export const AppFormInput = React.forwardRef<
  HTMLInputElement,
  AppFormInputProps
>(
  (
    {
      type = "default",
      field,
      value,
      formError,
      placeholder,
      options,
      optionValueKey,
      optionLabelKey,
      inputType,
      onChange,
      accept,
    },
    _ref
  ) => {
    switch (type) {
      case "default":
        return (
          <FormControl>
            {inputType ? (
              <Input
                {...field}
                className={`${formError ? "border-destructive" : ""}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                  onChange(e);
                  field.onChange(e);
                }}
                type={inputType}
                accept={accept}
              />
            ) : (
              <Input
                {...field}
                value={value}
                className={`${formError ? "border-destructive" : ""}`}
                placeholder={placeholder}
                onChange={(e) => {
                  onChange(e);
                  field.onChange(e);
                }}
              />
            )}
          </FormControl>
        );
      case "select":
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
              {options.map((option) => (
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
            <Input
              {...field}
              className={`text-card-foreground ${
                formError ? "border-destructive" : ""
              }`}
              placeholder={placeholder}
              onChange={(e) => {
                e.preventDefault();
                onChange(e);
              }}
              value={value}
              type={inputType}
              accept={accept}
            />
          </FormControl>
        );
    }
  }
);
