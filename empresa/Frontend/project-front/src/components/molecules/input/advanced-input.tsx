import { useId, useRef, useState } from "react";
import { Label } from "../../atoms/label";
import { Input } from "../../atoms/input";
import clsx from "clsx";
import { CircleXIcon } from "lucide-react";
import { type AdapterFieldProps } from "@/shared/form";
import { FormFieldAdapter } from "@/components/adapters/react-hook-form/form-field-adapter";

interface AdvancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  showCharCount?: boolean;
  maxLength?: number;
  clearable?: boolean;
}

/**
 * `AdvancedInput` es un campo de entrada enriquecido que ofrece funcionalidades
 * avanzadas como iconos, prefijos, sufijos, contador de caracteres y limpieza del input.
 *
 * Se puede usar como componente controlado (usando `value` y `onChange`)
 * o como componente no controlado (internamente usa `useState`).
 *
 * @component
 *
 * @param {string} [label] - Etiqueta visible asociada al input.
 * @param {React.ReactNode} [iconStart] - Ícono o elemento al inicio del input.
 * @param {React.ReactNode} [iconEnd] - Ícono o elemento al final del input.
 * @param {string} [prefix] - Texto estático al inicio del campo (ej: símbolo de moneda).
 * @param {string} [suffix] - Texto estático al final del campo (ej: unidades).
 * @param {boolean} [showCharCount] - Muestra contador de caracteres si es `true`.
 * @param {number} [maxLength] - Límite máximo de caracteres permitidos.
 * @param {boolean} [clearable=false] - Muestra botón para limpiar el campo.
 * @param {string | number | readonly string[]} [value] - Valor del input si es controlado.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - Función llamada al cambiar el valor.
 * @param {string} [className] - Clases CSS adicionales para personalizar el estilo.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} rest - Todos los demás props estándar de `<input>`.
 *
 * @returns {JSX.Element} Elemento de entrada enriquecido.
 */

export function AdvancedInput({
  label,
  iconStart,
  iconEnd,
  prefix,
  suffix,
  showCharCount,
  maxLength,
  clearable = false,
  className,
  value: controlledValue,
  onChange,
  ...rest
}: AdvancedInputProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const value = controlledValue ?? uncontrolledValue;
  const characterCount = typeof value === "string" ? value.length : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUncontrolledValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!controlledValue) setUncontrolledValue("");
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    inputRef.current?.focus();
  };

  const hasIconStart = !!iconStart;
  const hasIconEnd = !!iconEnd || clearable;

  return (
    <div className="*:not-first:mt-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        {prefix && (
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-sm">
            {prefix}
          </span>
        )}

        {iconStart && (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            {iconStart}
          </div>
        )}

        <Input
          id={id}
          ref={inputRef}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={clsx(
            className,
            {
              "ps-9": hasIconStart || prefix,
              "pe-9": hasIconEnd || suffix || showCharCount,
              "ps-16": prefix,
              "pe-12": suffix,
            }
          )}
          aria-describedby={showCharCount ? `${id}-description` : undefined}
          {...rest}
        />

        {suffix && (
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-sm">
            {suffix}
          </span>
        )}

        {iconEnd && (
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
            {iconEnd}
          </div>
        )}

        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear input"
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex w-9 items-center justify-center rounded-e-md transition outline-none focus:z-10 focus-visible:ring-[3px]"
          >
            <CircleXIcon size={16} aria-hidden="true" />
          </button>
        )}

        {showCharCount && typeof value === "string" && (
          <div
            id={`${id}-description`}
            className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-xs tabular-nums"
            aria-live="polite"
            role="status"
          >
            {characterCount}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
}

type AdvancedInputFieldProps = AdapterFieldProps & Omit<AdvancedInputProps, "value" | "onChange" | "onBlur" | "name"> 
/**
 * `AdvancedInputField` es un wrapper para `AdvancedInput` que lo conecta automáticamente
 * con `react-hook-form` usando `FormFieldAdapter`, gestionando errores, validación y sincronización.
 */
export function AdvancedInputField({
  name,
  rules,
  label,
  className,
  ...inputProps
}: AdvancedInputFieldProps) {
  return (
    <FormFieldAdapter
      name={name}
      label={label}
      rules={rules}
      className={className}
    >
      {({ value, onChange, onBlur, name, error }) => (
        <AdvancedInput
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange((e?.target?.value ?? e))}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...inputProps}
        />
      )}
    </FormFieldAdapter>
  );
}