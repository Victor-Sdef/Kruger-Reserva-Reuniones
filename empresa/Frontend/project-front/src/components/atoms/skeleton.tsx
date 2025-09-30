import { cn } from "@/shared/utils/cn";

/**
 * `Skeleton` es un componente visual que representa una carga en curso, 
 * útil para mejorar la percepción de velocidad mientras se obtienen datos o se montan vistas.
 * Utiliza una animación de tipo "pulse" y un color de fondo que puede integrarse fácilmente con el tema.
 *
 * @param {React.ComponentProps<'div'>} props - Props estándar de un `div`, incluyendo `className` para personalización.
 * @returns {JSX.Element} Un `div` con estilo animado que representa una carga.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-6 w-full" />
 * ```
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
