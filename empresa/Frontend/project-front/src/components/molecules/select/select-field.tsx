import { useId } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { FormFieldAdapter } from '@/components/adapters/react-hook-form/form-field-adapter';
import { type AdapterFieldProps } from '@/shared/form';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectFieldProps extends AdapterFieldProps {
  options: SelectOption[];
  placeholder?: string;
  valueType?: 'string' | 'number';
}

export function SelectField({
  name,
  label,
  rules,
  options,
  placeholder,
  className,
  valueType = 'string',
}: SelectFieldProps) {
  const id = useId();

  return (
    <FormFieldAdapter
      name={name}
      label={label}
      rules={rules}
      className={className}
    >
      {({ value, onChange, name, error }) => (
        <Select
          value={value?.toString()}
          onValueChange={(value) => {
            const convertedValue = valueType === 'number' ? Number(value) : value;
            onChange(convertedValue);
          }}
          name={name}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <SelectTrigger id={id}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value.toString()}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormFieldAdapter>
  );
}
