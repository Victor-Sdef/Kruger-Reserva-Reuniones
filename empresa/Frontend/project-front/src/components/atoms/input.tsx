import { cn } from "@/shared/utils/cn";
import * as React from "react";


/**
 * `Input` es un componente de entrada estilizado que extiende el elemento nativo `<input>`.
 * Aplica clases utilitarias para manejar distintos tipos de entrada (como `search` o `file`),
 * estilos responsivos, y accesibilidad mediante atributos ARIA.
 *
 * También gestiona estados como `disabled`, `aria-invalid`, y comportamientos específicos
 * para tipos `search` y `file`, mejorando la experiencia del usuario final.
 *
 * @component
 * @param {React.ComponentProps<"input">} props - Todas las propiedades estándar de un elemento `<input>`.
 * @param {string} [props.type] - Tipo de input (`text`, `search`, `file`, etc.). Aplica estilos condicionales.
 * @param {string} [props.className] - Clases personalizadas adicionales.
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Input type="text" placeholder="Nombre completo" />
 * <Input type="search" placeholder="Buscar..." />
 * <Input type="file" />
 * ```
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground/70 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        type === "search" &&
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
        type === "file" &&
          "text-muted-foreground/70 file:border-input file:text-foreground p-0 pr-3 italic file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
