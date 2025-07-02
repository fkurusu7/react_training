import toast from 'react-hot-toast';
import type { Settings } from '../../types/responses.type';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useGetSettings } from './useGetSettings';
import { useUpdateSetting } from './useUpdateSettings';

function UpdateSettingsForm() {
  const { isPending, settings } = useGetSettings();

  const { isPending: isUpdating, mutate: updateSetting } = useUpdateSetting();

  function handleUpdate(
    ev: React.BaseSyntheticEvent,
    setting: keyof Omit<Settings, '_id'>
  ) {
    const { value } = ev.target;

    if (!value) return;

    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      toast.error('Please enter a valid number');
      return;
    }

    updateSetting({ setting, value });
  }

  if (isPending) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={settings?.data.minBookingLength}
          onBlur={(ev) => handleUpdate(ev, 'minBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={settings?.data.maxBookingLength}
          onBlur={(ev) => handleUpdate(ev, 'maxBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={settings?.data.maxGuestsPerBooking}
          onBlur={(ev) => handleUpdate(ev, 'maxGuestsPerBooking')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={settings?.data.breakfastPrice}
          onBlur={(ev) => handleUpdate(ev, 'breakfastPrice')}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
