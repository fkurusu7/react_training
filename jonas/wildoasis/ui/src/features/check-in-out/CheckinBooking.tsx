import styled from 'styled-components';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

import { useEffect, useState } from 'react';
import { useMoveBack } from '../../hooks/useMoveBack';
import Checkbox from '../../ui/Checkbox';
import Spinner from '../../ui/Spinner';
import SpinnerMini from '../../ui/SpinnerMini';
import { formatCurrency } from '../../utils/helpers';
import BookingDataBox from '../bookings/BookingDataBox';
import { useGetBooking } from '../bookings/useGetBookin';
import { useGetSettings } from '../settings/useGetSettings';
import { useCheckin } from './useCheckin';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { isPending, data: bookingData } = useGetBooking();
  const booking = bookingData?.data;
  const { checkingInFn, isCheckingIn } = useCheckin();
  const { isPending: isLoadingSettings, settings } = useGetSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isPending || isLoadingSettings) return <Spinner />;
  if (!booking) return <div>Booking not found</div>;

  const id = booking._id;
  const optionalBfPrice =
    (settings?.data.breakfastPrice as number) *
    booking.numGuests *
    booking.numNights;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkingInFn({
        bookingId: id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBfPrice,
          totalPrice: (booking?.totalPrice as number) + optionalBfPrice,
        },
      });
    } else {
      checkingInFn({ bookingId: id });
    }
  };

  const calcTotalPrice = () => {
    return !addBreakfast
      ? `${formatCurrency(booking.totalPrice)}`
      : `${formatCurrency(
          booking.totalPrice + optionalBfPrice
        )} (${formatCurrency(booking.totalPrice)} + ${formatCurrency(
          optionalBfPrice
        )})`;
  };

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id='breakfast'
            disabled={isLoadingSettings}
          >
            Want to add Breakfast for {formatCurrency(optionalBfPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((isPaid) => !isPaid)}
          id='confirm'
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm {booking.guest.fullname.toLocaleUpperCase()} has paid the
          total amount of {calcTotalPrice()}
        </Checkbox>
      </Box>

      <ButtonGroup>
        {/* TODO: checking updates: isPaid to true and status to checked-in */}
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          {isCheckingIn ? <SpinnerMini /> : `Check in booking #{id}`}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
