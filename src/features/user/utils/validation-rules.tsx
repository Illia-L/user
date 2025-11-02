import * as yup from 'yup';

export const passwordRules = yup.string().required('Password is required');

export const newPasswordRules = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(50, 'Password must be at most 50 characters')
  .matches(/(?=.*\d)/, 'Password must contain at least one number')
  .matches(/(?=.*[A-Za-z])/, 'Password must contain at least one letter')
  .matches(
    /^[A-Za-z0-9!@#$%^&*()_+\-={}[\]:;"',.<>/?|\\]*$/,
    'Password must contain only Latin characters'
  );

export const passwordConfirmRules = yup
  .string()
  .required('Password confirm is required')
  .oneOf([yup.ref('newPassword')], 'Passwords must match');

export const emailRules = yup
  .string()
  .required('Email is required')
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Enter a valid email'
  );

export const nameRules = yup
  .string()
  .required('Name is required')
  .min(2, 'Name should be at least 2 characters')
  .max(50, 'Name should be at most 50 characters');

export const codeRules = yup
  .string()
  .required('Code is required')
  .matches(/^\d+$/, 'Code must be a number')
  .matches(/^.{4}$/, 'Code must be exactly 4 digits');

export const rememberMeRules = yup.boolean().required();
