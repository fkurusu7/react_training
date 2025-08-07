import { useMutation } from '@tanstack/react-query';
import type { UseFormReset } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signupAPI } from '../../services/apiAuthtentication';
import type { SignupFormData } from '../../types/responses.type';

export function useSignup(reset: UseFormReset<SignupFormData>) {
  const navigate = useNavigate();

  const { mutate: signup, isPending: isLoadingSignUp } = useMutation({
    mutationFn: (signupData: SignupFormData) => signupAPI(signupData),
    onSuccess: () => {
      toast.success(
        'Signed up successfully, Please verify your email address.'
      );
      reset();
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(`Signup Error: ${error.message}`);
    },
  });

  return { signup, isLoadingSignUp };
}
