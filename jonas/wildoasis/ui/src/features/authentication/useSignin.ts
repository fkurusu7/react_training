import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signinAPI } from '../../services/apiAuthtentication';

export function useSignin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signin, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signinAPI({ email, password }),
    onSuccess: (user) => {
      toast.success('Signed in successfully');
      console.log('user', user);
      // TODO: user should be the user data not the session or other data
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      toast.error(`Signed in Error: ${error.message}`);
    },
  });

  return { signin, isPending };
}
