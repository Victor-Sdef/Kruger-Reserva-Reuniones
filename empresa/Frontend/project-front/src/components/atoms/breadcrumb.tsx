import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/shared/utils/cn";


/**
 * `Breadcrumb` es el contenedor principal del sistema de navegación breadcrumb.
 * Utiliza un elemento `<nav>` con el atributo `aria-label="breadcrumb"` para accesibilidad.
 *
 * @component
 * @param {React.ComponentProps<"nav">} props - Props estándar de un elemento `<nav>`.
 * @returns {JSX.Element}
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * `BreadcrumbList` representa la lista ordenada de ítems dentro del breadcrumb.
 *
 * @component
 * @param {React.ComponentProps<"ol">} props - Props estándar de un elemento `<ol>`.
 * @param {string} [props.className] - Clase adicional para aplicar estilos personalizados.
 * @returns {JSX.Element}
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}


/**
 * `BreadcrumbItem` representa un ítem individual dentro del breadcrumb.
 *
 * @component
 * @param {React.ComponentProps<"li">} props - Props estándar de un elemento `<li>`.
 * @param {string} [props.className] - Clase adicional para aplicar estilos personalizados.
 * @returns {JSX.Element}
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}


/**
 * `BreadcrumbLink` representa un enlace navegable dentro del breadcrumb.
 * Se puede renderizar como un componente hijo mediante `Slot`.
 *
 * @component
 * @param {React.ComponentProps<"a"> & { asChild?: boolean }} props
 * @param {boolean} [props.asChild=false] - Si es `true`, renderiza un slot en lugar de `<a>`.
 * @param {string} [props.className] - Clase adicional para aplicar estilos personalizados.
 * @returns {JSX.Element}
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

/**
 * `BreadcrumbPage` representa el ítem actual activo en la jerarquía breadcrumb.
 * Renderizado como un `<span>` no interactivo con aria-current.
 *
 * @component
 * @param {React.ComponentProps<"span">} props
 * @param {string} [props.className] - Clase adicional para aplicar estilos personalizados.
 * @returns {JSX.Element}
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

/**
 * `BreadcrumbSeparator` es el separador visual entre ítems del breadcrumb.
 * Por defecto usa el ícono `ChevronRight`.
 *
 * @component
 * @param {React.ComponentProps<"li">} props
 * @param {React.ReactNode} [props.children] - Elemento personalizado para reemplazar el separador.
 * @param {string} [props.className] - Clase adicional para aplicar estilos personalizados.
 * @returns {JSX.Element}
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

/**
 * `BreadcrumbEllipsis` representa un botón o elemento de visualización truncado
 * en casos donde hay demasiados ítems en el breadcrumb. Usa un ícono de `MoreHorizontal`.
 *
 * @component
 * @param {React.ComponentProps<"span">} props
 * @param {string} [props.className] - Clase adicional para aplicar estilos personalizados.
 * @returns {JSX.Element}
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
