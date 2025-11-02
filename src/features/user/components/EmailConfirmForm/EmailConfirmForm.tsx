import {
  useEffect,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Form from '../ui/Form/Form';
import InputBlock from '../ui/InputBlock/InputBlock';

import { codeRules } from '../../utils/validation-rules';
import {
  emailConfirmDefaultBlockError,
  type EmailConfirmBlockError,
} from '../../utils/defaults';
import {
  confirmEmail,
  type ConfirmEmailRequest,
  type FormValidationErrorValue,
} from '../../redux/operations';
import { useAppDispatch } from '../../../../redux/hooks';
import type { UserFormFields } from '../../types/fields';

type Props = {
  email: string;
  rememberMe: boolean;
  resetFormRef: RefObject<(() => void) | null>;
  setBlockError: Dispatch<SetStateAction<EmailConfirmBlockError>>;
};

export type EmailConfirmFormValues = Pick<UserFormFields, 'code'>;
type FormValues = EmailConfirmFormValues;

const validationSchema = yup.object({ code: codeRules });

export default function EmailConfirmForm({
  email,
  rememberMe,
  resetFormRef,
  setBlockError,
}: Props) {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset, setError } = useForm<FormValues>({
    defaultValues: { code: '' },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    resetFormRef.current = reset;
  }, [reset, resetFormRef]);

  async function onSubmit(values: FormValues) {
    const code = parseInt(values.code, 10);
    if (Number.isNaN(code))
      return setError('code', { message: 'Code must be a number' });

    const payload: ConfirmEmailRequest = {
      code,
      email,
      rememberMe: rememberMe ? 1 : 0,
    };

    try {
      setIsPending(true);
      setBlockError(null);
      await dispatch(confirmEmail(payload)).unwrap();
    } catch (err) {
      const isApiError = err && typeof err === 'object' && 'message' in err;
      if (!isApiError) return setBlockError(emailConfirmDefaultBlockError);

      const { input, message } = err as FormValidationErrorValue<FormValues>;

      if (!input) return setBlockError({ status: false, message });

      if (input === 'code') return setError('code', { message });
      
      setBlockError(emailConfirmDefaultBlockError);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form
      formTitle='Confirm your email'
      submitText='Confirm'
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputBlock<FormValues>
        name='code'
        label='Code'
        type='text'
        placeholder='1234'
        control={control}
      />
    </Form>
  );
}
