import { useQuery } from '@tanstack/react-query';
import { getCurrentUserApi } from '../../services/apiAuthtentication';

export function useCurrentUser() {
  const { data: user, isPending: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserApi,
  });

  return {
    user,
    isLoadingUser,
    // TODO: isAuthenticated: user?.status === 'authenticated',
    isAuthenticated: false,
  };
}
