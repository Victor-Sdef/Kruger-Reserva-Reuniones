import { Controller, useFormContext } from 'react-hook-form';
import type { FieldValues, Path, RegisterOptions, UseControllerReturn } from 'react-hook-form';

interface FieldAdapterProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> {
  name: TName;
  defaultValue?: TFieldValues[TName];
  rules?: RegisterOptions<TFieldValues, TName>;
  label?: string;
  className?: string;
  /**
   * Función que recibe los props del campo (`value`, `onChange`, etc.)
   * más el error, y retorna el JSX del componente input/renderizado.
   */
  children: (
    fieldProps: UseControllerReturn<TFieldValues, TName>['field'] & {
      error?: string;
    },
  ) => React.ReactElement;
}

/**
 * `FormFieldAdapter` es un componente reutilizable que conecta un campo personalizado
 * con `react-hook-form`, incluyendo renderizado de `label` y mensajes de error.
 *
 * Este patrón permite mantener desacoplados los inputs personalizados mientras
 * se integran fácilmente con la lógica de formularios.
 *
 */
export function FormFieldAdapter<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  name,
  defaultValue,
  rules,
  label,
  className,
  children,
}: FieldAdapterProps<TFieldValues, TName>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const fieldError = errors[name]?.message as string | undefined;

  return (
    <div className={`space-y-1 ${className ?? ''}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => children({ ...field, error: fieldError })}
      />

      {fieldError && <p className="text-sm text-destructive">{fieldError}</p>}
    </div>
  );
}
