import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  const { isPending, data, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });

  return { isPending, data, error };
}
