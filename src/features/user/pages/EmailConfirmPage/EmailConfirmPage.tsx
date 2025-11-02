import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import EmailConfirmForm from '../../components/EmailConfirmForm/EmailConfirmForm';
import ResendCode from '../../components/ResendCode/ResendCode';
import type { EmailConfirmBlockError } from '../../utils/defaults';
import css from './EmailConfirmPage.module.css';

type LocationState = {
  message: EmailConfirmBlockError;
  email: string;
  rememberMe: boolean;
} | null;

export default function EmailConfirmPage() {
  const [blockMessage, setBlockMessage] =
    useState<EmailConfirmBlockError>(null);
  const stateRef = useRef<LocationState>(null);
  const resetFormRef = useRef<(() => void) | null>(null);
  const location = useLocation();

  useEffect(() => {
    stateRef.current = (location.state as LocationState) ?? null;
    setBlockMessage(stateRef.current?.message ?? null);
  }, [location.state]);

  const email = stateRef.current?.email ?? '';
  const rememberMe = stateRef.current?.rememberMe ?? true;

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

      <EmailConfirmForm
        email={email}
        resetFormRef={resetFormRef}
        rememberMe={rememberMe}
        setBlockError={setBlockMessage}
      />

      <ResendCode
        email={email}
        resetForm={resetFormRef.current || (() => {})}
        setBlockMessage={setBlockMessage}
      />
    </div>
  );
}
