import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';

import Form from '../ui/Form/Form';
import InputBlock from '../ui/InputBlock/InputBlock';
import Checkbox from '../ui/Checkbox/Checkbox';

import {
  signup,
  type FormValidationErrorValue,
  type SignupParam,
} from '../../redux/operations';
import { useAppDispatch } from '../../../../redux/hooks';
import {
  emailRules,
  nameRules,
  newPasswordRules,
  passwordConfirmRules,
  rememberMeRules,
} from '../../utils/validation-rules';
import type { UserFormFields } from '../../types/fields';

const validationSchema = yup.object({
  name: nameRules,
  email: emailRules,
  newPassword: newPasswordRules,
  passwordConfirm: passwordConfirmRules,
  rememberMe: rememberMeRules,
});

export type SignupFormValues = Pick<
  UserFormFields,
  'name' | 'email' | 'newPassword' | 'passwordConfirm' | 'rememberMe'
>;
type FormValues = SignupFormValues;

export default function SignupForm() {
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, setError, control } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      newPassword: '',
      passwordConfirm: '',
      rememberMe: true,
    },
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(formData: SignupParam) {
    try {
      setIsPending(true);
      setFormErrorMessage('');
      await dispatch(signup(formData)).unwrap();
      navigate('../confirm-email', {
        state: {
          email: formData.email,
          rememberMe: formData.rememberMe,
          message: { status: true, message: 'Code was successfully sent' },
        },
      });
    } catch (err) {
      const isApiError = err && typeof err === 'object' && 'message' in err;
      if (!isApiError) return setFormErrorMessage('Unknown error occurred');

      const apiError = err as FormValidationErrorValue<FormValues>;
      const { input, message } = apiError;

      if (!input) return setFormErrorMessage(message);
      if (input === 'email') return setError('email', { message });

      setFormErrorMessage('Unknown error occurred');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form
      formTitle='Sign up'
      submitText='Sign up'
      onSubmit={handleSubmit(onSubmit)}
      formError={formErrorMessage}
      isPending={isPending}
    >
      <InputBlock<FormValues>
        name='name'
        label='Name'
        placeholder='Michael'
        control={control}
      />

      <InputBlock<FormValues>
        name='email'
        label='Email'
        type='email'
        placeholder='your@email.com'
        control={control}
      />

      <InputBlock<FormValues>
        name='newPassword'
        label='Password'
        type='password'
        control={control}
      />

      <InputBlock<FormValues>
        name='passwordConfirm'
        label='Confirm password'
        type='password'
        control={control}
      />

      <Checkbox<FormValues>
        name='rememberMe'
        label='Remember me'
        control={control}
      />
    </Form>
  );
}
