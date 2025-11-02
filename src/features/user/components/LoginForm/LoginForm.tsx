import css from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from '../ui/Form/Form';
import InputBlock from '../ui/InputBlock/InputBlock';
import Checkbox from '../ui/Checkbox/Checkbox';
import {
  emailRules,
  passwordRules,
  rememberMeRules,
} from '../../utils/validation-rules';
import { Link, useNavigate } from 'react-router';
import type { UserFormFields } from '../../types/fields';
import {
  login,
  sendEmailConfirm,
  type FormValidationErrorValue,
} from '../../redux/operations';
import { useState } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';

const validationSchema = yup.object({
  email: emailRules,
  password: passwordRules,
  rememberMe: rememberMeRules,
});

export type LoginFormValues = Pick<
  UserFormFields,
  'email' | 'password' | 'rememberMe'
>;
type FormValues = LoginFormValues;

export default function LoginForm() {
  const [formErrorMessage, setFormErrorMessage] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(formData: LoginFormValues) {
    try {
      setIsPending(true);
      setFormErrorMessage('');
      await dispatch(login(formData)).unwrap();
    } catch (err) {
      const isApiError = err && typeof err === 'object' && 'message' in err;

      if (!isApiError) return setFormErrorMessage('Unknown error occurred');

      const apiError = err as FormValidationErrorValue<LoginFormValues>;

      if (apiError.appErrorCode === 'EMAIL_NOT_VERIFIED') {
        const { email, rememberMe } = formData;

        await dispatch(sendEmailConfirm(email));

        navigate('/account/confirm-email', {
          state: {
            email,
            rememberMe,
            message: {
              status: false,
              message:
                'You email is not confirmed yet. A 4-digit code was sent to your email. Enter it in the form below to finish registration.',
            },
          },
        });
      }

      setFormErrorMessage(apiError.message);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form
      formTitle='Log in'
      submitText='Log in'
      onSubmit={handleSubmit(onSubmit)}
      formError={formErrorMessage}
      isPending={isPending}
    >
      <InputBlock<FormValues>
        name='email'
        label='Email'
        type='email'
        placeholder='your@email.com'
        control={control}
      />

      <InputBlock<FormValues>
        name='password'
        label='Password'
        type='password'
        control={control}
      />

      <Link
        to='/account/forgot-password'
        className={css.forgotPasswordLink}
      >
        Forgot password?
      </Link>

      <Checkbox<FormValues>
        name='rememberMe'
        label='Remember me'
        control={control}
      />
    </Form>
  );
}
