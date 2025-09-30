import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

/**
 * `buttonVariants` define un conjunto de clases utilitarias reutilizables usando `class-variance-authority` (CVA),
 * permitiendo aplicar estilos consistentes y declarativos a botones con variantes y tamaños predefinidos.
 *
 * Variantes disponibles:
 * - `variant`: `"default"`, `"destructive"`, `"outline"`, `"secondary"`, `"ghost"`, `"link"`
 * - `size`: `"default"`, `"sm"`, `"lg"`, `"icon"`
 *
 * @see {@link https://cva.style/docs} para más información sobre CVA
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/**
 * `Button` es un componente flexible y estilizado para acciones de UI.
 * Usa `class-variance-authority` para soportar múltiples variantes visuales.
 * Soporta `asChild` para renderizar como otro componente (como `Link`, `span`, etc.)
 * en lugar de un `<button>`, manteniendo los estilos.
 *
 * @component
 * @param {React.ComponentProps<"button">} props - Propiedades estándar de un botón HTML.
 * @param {'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'} [props.variant] - Variante visual del botón.
 * @param {'default' | 'sm' | 'lg' | 'icon'} [props.size] - Tamaño del botón.
 * @param {string} [props.className] - Clases CSS adicionales a aplicar.
 * @param {boolean} [props.asChild=false] - Si es `true`, renderiza un Slot en lugar de un `<button>`.
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Button variant="secondary" size="lg">Guardar</Button>
 * <Button asChild><Link to="/home">Volver</Link></Button>
 * ```
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
