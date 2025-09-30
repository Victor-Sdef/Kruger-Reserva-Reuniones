"use client";

import { ProtectedRoute } from "@/shared/auth/ProtectedRoute";
import { LoginForm } from "./components/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms";

export default function LoginPage() {
  return (
    <ProtectedRoute isPublic>
      <div className="flex items-center justify-center min-h-screen w-full">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
