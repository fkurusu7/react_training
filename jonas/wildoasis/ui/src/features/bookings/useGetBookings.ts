import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  // ?status=all&sortBy=startDate-asc
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : {
          field: 'status',
          value: filterValue as 'checked-out' | 'checked-in' | 'unconfirmed',
        };

  const sortByValue = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByValue.split('-');
  const sortBy = {
    field: field as 'startDate' | 'totalPrice',
    direction: direction as 'desc' | 'asc',
  };

  const { isPending, data, error } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isPending, data, error };
}
