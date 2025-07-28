import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking } from '../../services/apiBookings';

export function useDeleteBooking() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isDeletingBooking, mutate: deleteBookingApi } =
    useMutation({
      mutationFn: (bookingId: string) => deleteBooking(bookingId),
      onSuccess: () => {
        toast.success('Booking deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['bookings'] });
        // navigate('/bookings');
      },
      onError: (error) => toast.error(error.message),
    });

  return { isDeletingBooking, deleteBookingApi };
}
