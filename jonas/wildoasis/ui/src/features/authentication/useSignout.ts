import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signoutApi } from '../../services/apiAuthtentication';

export function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signout, isPending: isLoadingSignout } = useMutation({
    mutationFn: signoutApi,
    onSuccess: () => {
      // remove user and all queries from cache
      queryClient.removeQueries();
      navigate('/signin', { replace: true });
    },
  });

  return { signout, isLoadingSignout };
}
