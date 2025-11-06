import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Form from '../ui/Form/Form';
import InputBlock from '../ui/InputBlock/InputBlock';

import { emailRules } from '../../utils/validation-rules';
import type { UserFormFields } from '../../types/fields';
import { useNavigate } from 'react-router';
import { changeEmail } from '../../api';

const validationSchema = yup.object({
  email: emailRules,
});

type FormValues = Pick<UserFormFields, 'email'>;

export default function ChangeEmailForm() {
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit({ email }: FormValues) {
    try {
      setIsPending(true);
      setFormErrorMessage('');
      await changeEmail({ email });

      navigate('/account/confirm-new-email');
    } catch {
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
      <InputBlock<FormValues>
        name='email'
        label='New email'
        type='email'
        placeholder='your@email.com'
        control={control}
      />
    </Form>
  );
}
