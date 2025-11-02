import type { HTMLInputTypeAttribute } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import styles from './InputBlock.module.css';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  control: Control<T>;
};

export default function InputBlock<T extends FieldValues>({
  name,
  label = '',
  type = 'text',
  placeholder = '',
  control,
}: Props<T>) {
  const inputId = `input-${String(name).replace(/\./g, '-')}`;
  const msgId = `${inputId}-msg`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={styles.block}>
          {label ? (
            <label className={styles.label} htmlFor={inputId}>
              {label}
            </label>
          ) : null}
          <input
            id={inputId}
            className={styles.input}
            type={type}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid || undefined}
            aria-describedby={msgId}
            {...field}
          />
          <div id={msgId} className={styles.message} data-invalid={fieldState.invalid || undefined}>
            {fieldState.error?.message || '\u00A0'}
          </div>
        </div>
      )}
    />
  );
}
