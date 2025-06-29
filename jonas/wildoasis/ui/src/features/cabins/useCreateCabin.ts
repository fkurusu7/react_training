import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormReset } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';
import type { CabinFormData } from '../../types/cabin.type';

export function useCreateCabin(reset: UseFormReset<CabinFormData>) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New Cabin created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
}
