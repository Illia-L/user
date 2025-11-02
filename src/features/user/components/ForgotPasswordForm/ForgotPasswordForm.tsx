import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Form from '../ui/Form/Form';
import InputBlock from '../ui/InputBlock/InputBlock';

import { emailRules } from '../../utils/validation-rules';
import type { UserFormFields } from '../../types/fields';
import { useNavigate } from 'react-router';
import { forgotPassword } from '../../api';

const validationSchema = yup.object({
  email: emailRules,
});

type FormValues = Pick<UserFormFields, 'email'>;

export default function ForgotPasswordForm() {
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, control, setError } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit({ email }: FormValues) {
    try {
      setIsPending(true);
      setFormErrorMessage('');
      await forgotPassword({ email });

      navigate('/account/reset-password', {
        state: {
          email,
        },
      });
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof err.response === 'object' &&
        err.response !== null &&
        'appError' in err.response &&
        err.response.appError === 'AUTH_USER_NOT_FOUND'
      )
        return setError('email', { message: 'Email not registered' });

      setFormErrorMessage('Something went wrong. Try again later.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form
      formTitle='Forgot Password'
      submitText='Send'
      onSubmit={handleSubmit(onSubmit)}
      formError={formErrorMessage}
      isPending={isPending}
    >
      <p>
        Enter your email, we will send you confirmation code to reset password.
      </p>

      <InputBlock<FormValues>
        name='email'
        label='Email'
        type='email'
        placeholder='your@email.com'
        control={control}
      />
    </Form>
  );
}
