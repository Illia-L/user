import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from '../ui/Form/Form';
import InputBlock from '../ui/InputBlock/InputBlock';
import {
  newPasswordRules,
  passwordConfirmRules,
  passwordRules,
} from '../../utils/validation-rules';
import type { UserFormFields } from '../../types/fields';
import { changePassword } from '../../api';

export type ChangePasswordFormValues = Pick<
  UserFormFields,
  'password' | 'newPassword' | 'passwordConfirm'
>;
type FormValues = ChangePasswordFormValues;

const validationSchema = yup.object({
  password: passwordRules,
  newPassword: newPasswordRules,
  passwordConfirm: passwordConfirmRules,
});

export default function ChangePasswordForm() {
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);

  const { handleSubmit, control, setError } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(values: FormValues) {
    const { password, newPassword } = values;
    const newData = { password, newPassword };

    try {
      setIsPending(true);
      setFormError(undefined);
      await changePassword(newData);
    } catch (err) {
      if (
        typeof err !== 'object' ||
        err === null ||
        !('response' in err) ||
        (typeof err.response !== 'object' &&
          err.response === null &&
          !('appErrorCode' in err.response))
      )
        return setFormError('Something went wrong. Try again later.');

      const { appErrorCode } = err.response as { appErrorCode: string };

      switch (appErrorCode) {
        case 'AUTH_INVALID_PASSWORD':
          return setError('password', { message: 'Invalid password' });
        case 'AUTH_INVALID_PASSWORD_FORMAT':
          return setError('newPassword', {
            message: 'Try a stronger new password',
          });
      }

      setFormError('Something went wrong. Try again later.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form
      formTitle='Change password'
      submitText='Change password'
      isPending={isPending}
      formError={formError}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputBlock<FormValues>
        name='password'
        label='Current password'
        type='password'
        control={control}
      />

      <InputBlock<FormValues>
        name='newPassword'
        label='New password'
        type='password'
        control={control}
      />

      <InputBlock<FormValues>
        name='passwordConfirm'
        label='Repeat new password'
        type='password'
        control={control}
      />
    </Form>
  );
}
