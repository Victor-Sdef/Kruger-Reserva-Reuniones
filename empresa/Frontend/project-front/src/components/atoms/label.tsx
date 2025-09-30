import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/shared/utils/cn";

/**
 * `Label` es un componente accesible que extiende `@radix-ui/react-label`.
 * Se utiliza para asociar texto descriptivo a campos de formulario, como `input`, `textarea` o `select`.
 * Hereda todas las props del componente `LabelPrimitive.Root` de Radix.
 *
 * Además, aplica estilos visuales adaptativos, incluyendo soporte para estados deshabilitados
 * mediante las clases `peer-disabled` y `group-data-[disabled=true]`.
 *
 * @component
 * @param {React.ComponentProps<typeof LabelPrimitive.Root>} props - Props heredadas de `RadixLabel.Root`.
 * @param {string} [props.className] - Clases CSS adicionales para personalización.
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Correo electrónico</Label>
 * <input id="email" type="email" />
 * ```
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/label} Documentación oficial de Radix Label
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-foreground text-sm leading-4 font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
