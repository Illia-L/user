
import type { FormEventHandler, ReactNode } from 'react';
import Button from '../../../../../components/Button/Button';
import css from './Form.module.css';

type Props = {
  formTitle: string;
  submitText: string;
  formError?: string;
  isPending?: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

export default function Form({
  formTitle,
  submitText,
  formError = '',
  isPending = false,
  onSubmit,
  children,
}: Props) {
  const hasError = Boolean(formError);

  return (
    <div className={css.root}>
      <div className={css.card}>
        <form
          onSubmit={onSubmit}
          noValidate
          className={css.form}
        >
          <h1 className={css.title}>{formTitle}</h1>

          <div className={css.fields}>{children}</div>

          <Button
            type='submit'
            size='lg'
            isLoading={isPending}
            className={css.submit}
          >
            {submitText}
          </Button>

          <p
            className={css.error}
            role={hasError ? 'alert' : undefined}
            aria-live='polite'
          >
            {hasError ? formError : '\u00A0'}
          </p>
        </form>
      </div>
    </div>
  );
}
