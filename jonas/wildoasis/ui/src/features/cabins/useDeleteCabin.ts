import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin } from '../../services/apiCabins';
import type { Cabin } from '../../types/cabin.type';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (cabin: Cabin) => deleteCabin(cabin),
    onSuccess: () => {
      toast.success('Cabin deleted');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, mutate };
}
