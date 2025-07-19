import type { Booking } from '../../types/responses.type';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import BookingRow from './BookingRow';
import { useBookings } from './useGetBookings';

function BookingTable() {
  const { data: bookingsData, isPending, error } = useBookings();
  if (isPending) return <Spinner />;
  if (error?.message) console.log('error', error);

  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookingsData?.data.bookings}
          render={(booking: Booking) => (
            <BookingRow key={booking._id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={bookingsData?.data.totalDocuments as number} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
