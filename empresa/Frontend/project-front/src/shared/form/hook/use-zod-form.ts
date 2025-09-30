import { useForm, type UseFormProps, type UseFormReturn, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ZodType } from 'zod';

/**
 * Hook personalizado que integra react-hook-form con Zod para validación tipada.
 *
 * @template TInput - Tipo inferido a partir del esquema Zod.
 * @template TSchema - Esquema de Zod con entrada de tipo TInput.
 * @param schema - El esquema Zod utilizado para la validación.
 * @param options - Opciones adicionales de react-hook-form, sin incluir `resolver`.
 * @returns Hook useForm tipado con el esquema validado.
 */
export function useZodForm<
  TInput extends FieldValues,
  TSchema extends ZodType<TInput>
>(
  schema: TSchema,
  options?: Omit<UseFormProps<TInput>, 'resolver'>
): UseFormReturn<TInput> {
  return useForm<TInput>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    ...options,
  });
}
