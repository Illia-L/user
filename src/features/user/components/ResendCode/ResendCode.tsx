import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { sendEmailConfirm } from '../../redux/operations';
import { useAppDispatch } from '../../../../redux/hooks';
import {
  emailConfirmDefaultBlockError,
  type EmailConfirmBlockError,
} from '../../utils/defaults';
import css from './ResendCode.module.css';
import Button from '../../../../components/Button/Button';

type Props = {
  email: string;
  resetForm?: (() => void) | null;
  setBlockMessage: Dispatch<SetStateAction<EmailConfirmBlockError>>;
};

export default function ResendCode({
  email,
  resetForm,
  setBlockMessage,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = setInterval(
      () => setResendCooldown(r => (r === 0 ? 0 : r - 1)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  async function handleResend() {
    try {
      setBlockMessage(null);
      setIsLoading(true);
      if (resetForm) resetForm();

      await dispatch(sendEmailConfirm(email)).unwrap();
      setBlockMessage({
        status: true,
        message: `New code was sent to ${email}`,
      });
    } catch {
      setBlockMessage(emailConfirmDefaultBlockError);
    } finally {
      setIsLoading(false);
      setResendCooldown(30);
    }
  }

  const disabled = resendCooldown > 0;

  return (
    <Button
      className={css.resend}
      variant='link'
      onClick={handleResend}
      disabled={disabled}
      aria-live='polite'
      isLoading={isLoading}
    >
      {resendCooldown > 0
        ? `Resend available in ${resendCooldown}s`
        : 'Resend code'}
    </Button>
  );
}
