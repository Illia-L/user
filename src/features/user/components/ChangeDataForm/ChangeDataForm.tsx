import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from '../ui/Form/Form';
import InputBlock from '../ui/InputBlock/InputBlock';
import { nameRules } from '../../utils/validation-rules';
import {
  updateUserData,
  type FormValidationErrorValue,
} from '../../redux/operations';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectName } from '../../redux/selectors';
import type { UserFormFields } from '../../types/fields';

type FormValues = Pick<UserFormFields, 'name'>;

const validationSchema = yup.object({ name: nameRules });

export default function ChangeDataForm() {
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();
  const currentName = useAppSelector(selectName);

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { name: currentName },
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(values: FormValues) {
    const { name } = values;
    const newData = { name };

    try {
      setIsPending(true);
      setFormError(undefined);
      await dispatch(updateUserData(newData)).unwrap();
    } catch (err) {
      const formError = err as FormValidationErrorValue<FormValues>;

      setFormError(formError.message);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form
      formTitle='Change your name'
      submitText='Save'
      isPending={isPending}
      formError={formError}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputBlock<FormValues>
        name='name'
        label='New name'
        type='text'
        control={control}
      />
    </Form>
  );
}
