import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';
import { deleteImageFromS3, uploadImageToS3AWS } from '../../services/apiS3';
import type { Cabin, CabinFormData } from '../../types/cabin.type';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';

function CreateCabinForm({ cabinToEdit }: { cabinToEdit?: Cabin }) {
  const { _id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);
  const prevImage = isEditSession ? cabinToEdit?.image : null;

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinFormData>({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New Cabin created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: CabinFormData;
      id: string;
    }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin updated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  async function onSubmit(data: CabinFormData, ev?: React.BaseSyntheticEvent) {
    ev?.preventDefault();
    try {
      if (isEditSession && editId) {
        // image already exists and was updated by the user
        if (typeof data.image !== 'string') {
          const imageFile = data.image[0] as unknown as File;
          const imageSrc = await uploadImageToS3AWS(imageFile);
          editCabin({ newCabinData: { ...data, image: imageSrc }, id: editId });

          // delete image after cabin was updated
          if (prevImage) await deleteImageFromS3(prevImage);
        } else {
          editCabin({ newCabinData: data, id: editId });
        }
      } else {
        if (!data.image) throw new Error('Cabin Image not selected');

        const imageFile = data.image[0] as unknown as File;
        const imageSrc = await uploadImageToS3AWS(imageFile);
        createCabin({ ...data, image: imageSrc });
      }
    } catch (error) {
      console.log('error', error);
      return;
    }
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
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}

          <Button variation='secondary' type='reset'>
            Cancel
          </Button>
          <Button type='submit' disabled={isWorking}>
            {isEditSession ? 'Edit cabin' : 'Create new cabin'}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
