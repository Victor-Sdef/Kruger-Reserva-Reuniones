"use client";
import { Separator } from "@/components/atoms";
import { AppSidebar } from "@/components/molecules/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/molecules/sidebar/sidebar";
import GradientLayout from "@/components/template/gradient-layout";
import { ProtectedRoute } from "@/shared/auth/ProtectedRoute";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <GradientLayout>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8 bg-background/25 backdrop-blur-3xl">
            <header className="flex flex-wrap gap-3 py-4 shrink-0 items-center transition-all ease-linear border-b">
              {/* Left side */}
              <div className="flex flex-1 items-center gap-2">
                <SidebarTrigger className="-ms-1" />
                <div className="max-lg:hidden lg:contents">
                  <Separator
                    orientation="vertical"
                    className="me-2 data-[orientation=vertical]:h-4"
                  />
                </div>
              </div>
            </header>
            <section className="py-4">{children}</section>
          </SidebarInset>
        </SidebarProvider>
      </GradientLayout>
    </ProtectedRoute>
  );
}
