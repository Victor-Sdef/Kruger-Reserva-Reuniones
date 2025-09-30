import { useAuth } from './useAuth';

export const useRole = () => {
  const { user } = useAuth();

  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  const isUser = () => {
    return user?.role === 'USER';
  };

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  return {
    isAdmin,
    isUser,
    hasRole,
    currentRole: user?.role
  };
};
