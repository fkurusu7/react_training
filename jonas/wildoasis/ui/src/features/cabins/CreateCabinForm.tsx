import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';
import type { CabinFormData } from '../../types/cabin.type';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinFormData>();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New Cabin created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  // const onSubmit: SubmitHandler<CabinFormData> = (data, event) => {
  //   event?.preventDefault(); // Optional chaining since event might be undefined
  //   console.log('Data', data);
  // };
  function onSubmit(data: CabinFormData, ev?: React.BaseSyntheticEvent) {
    ev?.preventDefault();
    console.log('Data: ', data);
    console.log('image', data.image[0]);
    // mutate({ ...data, image: data.image[0] });
  }

  function onError(errors: FieldErrors<CabinFormData>) {
    console.log('Errorss', errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' id='name' error={errors.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow
        label='Maximum capacity'
        id='maxCapacity'
        error={errors.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>
      <FormRow
        label='Regular price'
        id='regularPrice'
        error={errors.regularPrice?.message}
      >
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 50, message: 'Price should be at least 50' },
          })}
        />
      </FormRow>
      <FormRow label='Discount' id='discount' error={errors.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>
      <FormRow
        label='Description for website'
        id='description'
        error={errors.description?.message}
      >
        <Textarea
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' id='image'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}

          <Button variation='secondary' type='reset'>
            Cancel
          </Button>
          <Button type='submit' disabled={isPending}>
            Add cabin
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
