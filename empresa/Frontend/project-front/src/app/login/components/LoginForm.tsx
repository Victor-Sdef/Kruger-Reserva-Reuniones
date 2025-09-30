'use client'

import { Form, useZodForm } from '@/shared/form';
import { MailIcon } from 'lucide-react';
import { loginSchema, type LoginFormValues } from './AuthValidation';
import { AdvancedInputField } from '@/components/molecules/input/advanced-input';
import { PasswordField } from '@/components/molecules/input/password-input';
import { Button } from '@/components/atoms';
import { useAuthStore } from '@/shared/store/auth';

export function LoginForm() {
  const { login, isLoading, error } = useAuthStore();

  const form = useZodForm(loginSchema, {
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await login({
      username: data.username, // adaptamos el email como username para la API
      password: data.password
    });
  };

  return (
    <Form<LoginFormValues> methods={form} onSubmit={onSubmit} className="max-w-md space-y-6">
      <AdvancedInputField
        name="username"
        label="Username"
        placeholder="usuario1"
        iconEnd={<MailIcon size={16} />}
      />
      <PasswordField name="password" />
      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Iniciar sesión'}
      </Button>
    </Form>
  );
}
