import styled from 'styled-components';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Tag from '../../ui/Tag';

import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner';
import BookingDataBox from './BookingDataBox';
import { useGetBooking } from './useGetBookin';

// A page should not fetch data and also not have any other side effects no hardRULE
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isPending, data: booking } = useGetBooking();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isPending) return <Spinner />;
  if (!booking) return <div>Booking not found</div>;
  const status = booking?.data.status;
  const id = booking?.data._id;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking.data} />

      <ButtonGroup>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
