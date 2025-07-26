import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateBooking } from '../../services/apiBookings';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkingInFn, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, { status: 'checked-in', isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking #${data} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      navigate('/bookings');
    },
    onError: () => toast.error('Error check in'),
  });

  return { checkingInFn, isCheckingIn };
}
