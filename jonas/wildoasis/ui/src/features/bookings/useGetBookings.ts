import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  // ?status=all&sortBy=startDate-asc
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Filter Data by status field
  const filterValue = searchParams.get('status');

  // TODO: change page to 1 if status is different from previous one

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : {
          field: 'status',
          value: filterValue as 'checked-out' | 'checked-in' | 'unconfirmed',
        };

  // Sort Data by startDate or totalPrice fields
  const sortByValue = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByValue.split('-');
  const sortBy = {
    field: field as 'startDate' | 'totalPrice',
    direction: direction as 'desc' | 'asc',
  };

  // Handle Pagination
  const page = searchParams.get('page') || '1';

  const { isPending, data, error } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(
    (data?.data.totalDocuments as number) / PAGE_SIZE
  );
  if (+page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, String(+page + 1)],
      queryFn: () => getBookings({ filter, sortBy, page: String(+page + 1) }),
    });
  }
  if (+page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, String(+page - 1)],
      queryFn: () => getBookings({ filter, sortBy, page: String(+page - 1) }),
    });
  }

  return { isPending, data, error };
}
