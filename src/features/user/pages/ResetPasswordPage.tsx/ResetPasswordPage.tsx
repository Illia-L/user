import { useState } from 'react';
import ResendCode from '../../components/ResendCode/ResendCode';
import type { EmailConfirmBlockError } from '../../utils/defaults';
import css from './ResetPasswordPage.module.css';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import { useAppSelector } from '../../../../redux/hooks';
import { selectEmail } from '../../redux/selectors';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';

export default function ResetPasswordPage() {
  const [blockMessage, setBlockMessage] =
    useState<EmailConfirmBlockError>(null);
  const email = useAppSelector(selectEmail);

  return (
    <div className={css.wrap}>
      <div className={css.alertWrap}>
        {blockMessage && (
          <div
            className={css.alert}
            data-variant={blockMessage.status ? 'success' : 'error'}
            role='alert'
          >
            {blockMessage.message}
          </div>
        )}
      </div>

      <p className={css.text}>
        Enter the 4-digit code we sent to your email. It may take a minute to
        arrive. Please also check your spam or junk folder.
      </p>

      <ResetPasswordForm />

      <ResendCode
        email={email}
        setBlockMessage={setBlockMessage}
      />
    </div>
  );
}
