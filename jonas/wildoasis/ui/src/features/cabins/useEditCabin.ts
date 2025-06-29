import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormReset } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';
import type { CabinFormData } from '../../types/cabin.type';

export function useEditCabin(reset: UseFormReset<CabinFormData>) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: CabinFormData;
      id: string;
    }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin updated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
}
