import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Form from '../ui/Form/Form';
import InputBlock from '../ui/InputBlock/InputBlock';

import {
  resetPassword,
  type ResetPasswordData,
} from '../../redux/operations';
import { useAppDispatch } from '../../../../redux/hooks';
import {
  codeRules,
  newPasswordRules,
  passwordConfirmRules,
} from '../../utils/validation-rules';
import type { UserFormFields } from '../../types/fields';
import { useLocation } from 'react-router';

const validationSchema = yup.object({
  code: codeRules,
  newPassword: newPasswordRules,
  passwordConfirm: passwordConfirmRules,
});

export type ResetPasswordFormValues = Pick<
  UserFormFields,
  'code' | 'newPassword' | 'passwordConfirm'
>;
type FormValues = ResetPasswordFormValues;

export default function ResetPasswordForm() {
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();
  const { email } = useLocation().state;
  const { handleSubmit, control, setError } = useForm<FormValues>({
    defaultValues: {
      code: '',
      newPassword: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(values: FormValues) {
    const { code, newPassword } = values;
    const resetPasswordData: ResetPasswordData = {
      code,
      newPassword,
      email,
    };

    try {
      setIsPending(true);
      setFormErrorMessage('');
      await dispatch(resetPassword(resetPasswordData)).unwrap();
    } catch (err) {
      if (
        typeof err !== 'object' ||
        err === null ||
        !('response' in err) ||
        (typeof err.response !== 'object' &&
          err.response === null &&
          !('appErrorCode' in err.response))
      )
        return setFormErrorMessage('Something went wrong. Try again later.');

      const { appErrorCode } = err.response as { appErrorCode: string };

      switch (appErrorCode) {
        case 'AUTH_INVALID_CODE':
          return setError('code', { message: 'Invalid code' });
        case 'AUTH_INVALID_PASSWORD_FORMAT':
          return setError('newPassword', {
            message: 'Try a stronger new password',
          });
      }

      setFormErrorMessage('Something went wrong. Try again later.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form
      formTitle='Reset Password'
      submitText='Reset Password'
      onSubmit={handleSubmit(onSubmit)}
      formError={formErrorMessage}
      isPending={isPending}
    >
      <InputBlock<FormValues>
        name='code'
        label='Code'
        type='text'
        placeholder='1234'
        control={control}
      />

      <InputBlock<FormValues>
        name='newPassword'
        label='New Password'
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
