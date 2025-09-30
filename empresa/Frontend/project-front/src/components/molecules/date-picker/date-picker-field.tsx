"use client";

import { FormFieldAdapter } from "@/components/adapters/react-hook-form/form-field-adapter";
import { type AdapterFieldProps } from "@/shared/form";
import { DatePicker } from "./date-picker";
import { format } from "date-fns";
import { cn } from "@/shared/utils/cn";

// Use AdapterFieldProps directly for props

export function DatePickerField({
  name,
  label,
  rules,
  className,
}: AdapterFieldProps) {
  return (
    <FormFieldAdapter
      name={name}
      label={label}
      rules={rules}
      className={className}
    >
      {({ value, onChange, error }) => (
        <DatePicker
          date={value ? new Date(value) : undefined}
          onSelect={(date) => 
            onChange(date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : '')
          }
          className={cn(
            error && "border-destructive"
          )}
        />
      )}
    </FormFieldAdapter>
  );
}
