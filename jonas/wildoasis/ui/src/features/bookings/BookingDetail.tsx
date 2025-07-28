import styled from 'styled-components';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Tag from '../../ui/Tag';

import { useNavigate } from 'react-router-dom';
import { useMoveBack } from '../../hooks/useMoveBack';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';
import { useCheckout } from '../check-in-out/useCheckout';
import BookingDataBox from './BookingDataBox';
import { useDeleteBooking } from './useDeleteBooking';
import { useGetBooking } from './useGetBookin';

// A page should not fetch data and also not have any other side effects no hardRULE
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isPending, data: booking } = useGetBooking();
  const { checkingOutFn, isCheckingOut } = useCheckout();
  const { isDeletingBooking, deleteBookingApi } = useDeleteBooking();

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
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
        )}

        {status === 'checked-in' && (
          <Button onClick={() => checkingOutFn(id)}>
            {isCheckingOut ? <SpinnerMini /> : 'Check out'}
          </Button>
        )}

        <Modal>
          <Modal.Open opensWindowName='deleteBooking'>
            <Button variation='danger'>Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name='deleteBooking'>
            <ConfirmDelete
              resourceName='booking'
              onConfirm={() =>
                deleteBookingApi(id, { onSettled: () => navigate(-1) })
              }
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
