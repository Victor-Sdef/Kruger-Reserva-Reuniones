import type { FieldValues, Path, RegisterOptions } from 'react-hook-form';

/**
 * `AdapterFieldProps` define las props estándar para campos adaptados a `react-hook-form`
 * cuando se integran con un componente visual reutilizable mediante un adaptador (como `FormFieldAdapter`).
 *
 * Esta interfaz es útil para generar componentes de formulario tipados y reutilizables.
 *
 * @template TFieldValues - Representa la forma general de los valores del formulario.
 * @template TName - Representa la clave específica dentro de `TFieldValues`.
 */
export interface AdapterFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  /**
   * Nombre del campo del formulario, usado para el registro con `react-hook-form`.
   * Debe ser una clave válida de `TFieldValues`.
   *
   * @example "email", "user.name"
   */
  name: TName;

  /**
   * Etiqueta opcional que será mostrada junto al input.
   * Suele usarse como `label` accesible o visible para el usuario.
   */
  label?: string;

  /**
   * Clases CSS opcionales para estilizar el contenedor o el campo.
   */
  className?: string;

  /**
   * Reglas de validación específicas para este campo, compatibles con `react-hook-form`.
   *
   * @example
   * ```ts
   * rules={{ required: "Este campo es obligatorio", maxLength: 20 }}
   * ```
   */
  rules?: RegisterOptions<TFieldValues, TName>;
}
