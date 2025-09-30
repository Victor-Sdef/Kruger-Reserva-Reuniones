import type { ReactNode } from 'react';

/**
 * `GradientLayout` es un componente de diseño que envuelve su contenido con un fondo decorativo
 * compuesto por dos capas: una cuadrícula radial y un gradiente suave.
 */
const GradientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative h-screen w-full bg-background">
      <div className="z-0 absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(_var(--foreground-opacity)_1px,transparent_1px)] [background-size:16px_16px] "></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-radial-[at_25%_75%] from-primary-opacity from-40% to-background to-100%">
        {children}
      </div>
    </div>
  );
};

export default GradientLayout;
