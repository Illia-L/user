import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from '../ui/Form/Form';
import InputBlock from '../ui/InputBlock/InputBlock';
import { codeRules, passwordRules } from '../../utils/validation-rules';
import type { UserFormFields } from '../../types/fields';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { confirmNewEmail } from '../../redux/operations';
import { selectEmail } from '../../redux/selectors';

export type ChangePasswordFormValues = Pick<
  UserFormFields,
  'password' | 'code'
>;
type FormValues = ChangePasswordFormValues;

const validationSchema = yup.object({
  password: passwordRules,
  code: codeRules,
});

export default function ConfirmNewEmailForm() {
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectEmail);
  const { handleSubmit, control, setError } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(values: FormValues) {
    const { password, code } = values;

    try {
      setIsPending(true);
      setFormError(undefined);
      await dispatch(confirmNewEmail({ email, password, code }));
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
        case 'AUTH_INVALID_CODE':
          return setError('code', { message: 'Invalid code' });
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
        label='Password'
        type='password'
        control={control}
      />

      <InputBlock<FormValues>
        name='code'
        label='Code'
        type='password'
        control={control}
      />
    </Form>
  );
}
