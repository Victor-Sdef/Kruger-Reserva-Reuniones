import React from 'react';
import { type FieldValues, FormProvider as RHFProvider, type UseFormProps, type UseFormReturn, useForm } from 'react-hook-form';

/**
 * Props del componente `Form`.
 *
 * @template T - Tipo de valores del formulario, debe extender `FieldValues`.
 * @property {React.ReactNode} children - Elementos hijos que serán renderizados dentro del formulario.
 * @property {(data: T) => void} onSubmit - Función que se ejecuta al enviar el formulario con datos válidos.
 * @property {string} [className] - Clase CSS adicional para personalizar el contenedor `<form>`.
 * @property {UseFormReturn<T>} [methods] - Instancia externa de métodos de `useForm`, útil para compartir contexto del formulario.
 * @property {UseFormProps<T>} [rest] - Opciones adicionales que se pasan a `useForm` si no se proporciona `methods`.
 */
interface FormProps<T extends FieldValues> extends UseFormProps<T> {
  children: React.ReactNode;
  onSubmit: (_data: T) => void;
  className?: string;
  methods?: UseFormReturn<T>;
}

/**
 * `Form` es un componente reutilizable basado en `react-hook-form` que proporciona un contexto
 * de formulario utilizando `FormProvider`. Permite usar métodos propios de `useForm` o aceptar uno externo.
 *
 * @template T - Tipo de datos del formulario, definido por el consumidor.
 * @param {FormProps<T>} props - Propiedades del componente.
 * @returns {JSX.Element} Un formulario con soporte de validación y contexto compartido para los campos.
 *
 * @example
 * ```tsx
 * <Form<T> methods={methods} onSubmit={handleSubmit}>
 *   <Input name="cabecera.fechaEmision" />
 * </Form>
 * ```
 */
export const Form = <T extends FieldValues>({ children, onSubmit, className, methods, ...formOptions }: FormProps<T>) => {
  const internalMethods = useForm<T>(formOptions);
  const finalMethods = methods || internalMethods;

  return (
    <RHFProvider {...finalMethods}>
      <form onSubmit={finalMethods.handleSubmit(onSubmit)} className={`${className ? className : 'max-w-5xl'}`}>
        {children}
      </form>
    </RHFProvider>
  );
};