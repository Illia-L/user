// src/components/auth/SignupAlreadyRegistered.tsx
import css from './SignupAlreadyRegistered.module.css';
import Button from '../../../../components/Button/Button';

type Props = { onLogout?: () => void };

export default function SignupAlreadyRegistered({ onLogout }: Props) {
  return (
    <div className={css.wrap}>
      <div className={css.alert} role="status" aria-live="polite">
        You are already registered
      </div>
      <p className={css.text}>
        To register with a different email logout first.
      </p>
      <Button onClick={onLogout}>Log out</Button>
    </div>
  );
}
