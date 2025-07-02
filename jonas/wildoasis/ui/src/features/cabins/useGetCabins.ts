import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';
import type { CabinResponse } from '../../types/responses.type';

export function useGetCabins() {
  const { isPending, data } = useQuery<CabinResponse>({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { isPending, data };
}
