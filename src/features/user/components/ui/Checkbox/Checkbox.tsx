import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import styles from './Checkbox.module.css';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
};

export default function Checkbox<T extends FieldValues>({ name, label, control }: Props<T>) {
  const id = `chk-${String(name).replace(/\./g, '-')}`;
  const msgId = `${id}-msg`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={styles.block}>
          <label className={styles.label} htmlFor={id}>
            <input
              id={id}
              className={styles.checkbox}
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              aria-invalid={fieldState.invalid || undefined}
              aria-describedby={msgId}
            />
            <span className={styles.text}>{label}</span>
          </label>
        </div>
      )}
    />
  );
}
