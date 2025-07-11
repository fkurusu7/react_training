import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { useBookings } from './useGetBookings';

function BookingTable() {
  const { data, isPending, error } = useBookings();
  console.log('data', data);
  console.log('error', error);
  if (isPending) return <Spinner />;

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

        {/* <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        /> */}
      </Table>
    </Menus>
  );
}

export default BookingTable;
