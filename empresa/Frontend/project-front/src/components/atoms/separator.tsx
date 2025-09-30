import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/shared/utils/cn";

/**
 * `Separator` es un componente visual que actúa como una línea divisoria,
 * utilizando `@radix-ui/react-separator` para manejar accesibilidad y orientación.
 * Puede ser decorativo o semántico dependiendo del uso.
 *
 * Soporta orientación horizontal (por defecto) o vertical,
 * y se puede utilizar para dividir secciones de contenido en formularios, menús, o layouts.
 *
 * @component
 * @param {React.ComponentProps<typeof SeparatorPrimitive.Root>} props - Props del componente Radix Separator.
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal'] - Define la orientación visual del separador.
 * @param {boolean} [props.decorative=true] - Si es decorativo (no semántico). Si es `false`, debe acompañarse de `role="separator"` para lectores de pantalla.
 * @param {string} [props.className] - Clases CSS adicionales para personalización.
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" className="mx-4" />
 * ```
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/components/separator} Documentación oficial de Radix Separator
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
