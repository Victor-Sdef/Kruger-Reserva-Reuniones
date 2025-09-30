import { Calendar } from '@/components/atoms/calendar';
import { FormFieldAdapter } from '@/components/adapters/react-hook-form/form-field-adapter';
import { type AdapterFieldProps } from '@/shared/form';
import { format } from 'date-fns';
import { cn } from '@/shared/utils/cn';

interface CalendarFieldProps extends AdapterFieldProps {
  placeholder?: string;
}

export function CalendarField({
  name,
  label,
  rules,
  className,
}: CalendarFieldProps) {
  return (
    <FormFieldAdapter
      name={name}
      label={label}
      rules={rules}
      className={className}
    >
      {({ value, onChange, error }) => (
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => onChange(date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : '')}
          className={cn(
            "rounded-md border",
            error && "border-destructive"
          )}
        />
      )}
    </FormFieldAdapter>
  );
}
