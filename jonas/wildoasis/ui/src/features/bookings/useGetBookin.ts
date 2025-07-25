import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../services/apiBookings';
import type { BookingSingleResponse } from '../../types/responses.type';

export function useGetBooking() {
  const { bookingId } = useParams();

  const { isPending, data } = useQuery<BookingSingleResponse>({
    queryKey: ['bookings'],
    queryFn: () => getBooking(bookingId as string),
    retry: false,
  });

  return { isPending, data };
}
