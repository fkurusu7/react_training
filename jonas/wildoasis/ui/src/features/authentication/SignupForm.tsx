import { useForm } from 'react-hook-form';
import type { SignupFormData } from '../../types/responses.type';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<SignupFormData>();
  const { errors } = formState;

  const { signup, isLoadingSignUp } = useSignup(reset);

  function onSubmit(formData: SignupFormData, ev?: React.BaseSyntheticEvent) {
    ev?.preventDefault();
    console.log('data', formData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, ...finalFormData } = formData;
    signup(finalFormData);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors?.fullname?.message as string}>
        <Input
          type='text'
          id='fullName'
          disabled={isLoadingSignUp}
          {...register('fullname', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message as string}>
        <Input
          type='email'
          id='email'
          disabled={isLoadingSignUp}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message as string}
      >
        <Input
          type='password'
          id='password'
          disabled={isLoadingSignUp}
          {...register('password', {
            required: 'This field is required',
            minLength: { value: 8, message: 'Minimum of 8 chars' },
          })}
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={errors?.passwordConfirm?.message as string}
      >
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isLoadingSignUp}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isLoadingSignUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
