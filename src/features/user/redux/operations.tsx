import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type { UserState } from './slice';
import * as api from '../api';
import type { ResetPasswordFormValues } from '../components/ResetPasswordForm/ResetPasswordForm';
import type { SignupFormValues } from '../components/SignupForm/SignupForm';
import type { LoginFormValues } from '../components/LoginForm/LoginForm';
import type { EmailConfirmFormValues } from '../components/EmailConfirmForm/EmailConfirmForm';
import type { UserFormFields } from '../types/fields';

axios.defaults.baseURL = 'https://zoshyt.online/api/users';
// axios.defaults.withCredentials = true;

type ApiError = {
  appErrorCode: string;
};

type ApiErrorData = ApiError & { [key: string]: string | number };

const extractAppErrorCode = (err: AxiosError<ApiErrorData>) =>
  err.response?.data?.appErrorCode;

export type FormValidationErrorValue<T> = {
  appErrorCode?: string;
  input?: keyof T;
  message: string;
};

export type SignupParam = {
  name: string;
  email: string;
  newPassword: string;
  rememberMe: boolean;
};

export const signup = createAsyncThunk<
  Pick<UserState, 'name' | 'email' | 'isEmailConfirmed'>,
  SignupParam,
  { rejectValue: FormValidationErrorValue<SignupFormValues> }
>('user/signup', async (data: SignupParam, { rejectWithValue }) => {
  const { name, email, newPassword: password } = data;
  const rememberMe = data ? '1' : '0';
  const requestBody = { name, email, password, rememberMe };

  try {
    const responseData = await api.signup(requestBody);

    const { name, email } = responseData;
    const isEmailConfirmed = !!responseData.is_email_verified;

    return { name, email, isEmailConfirmed };
  } catch (err) {
    const errValue: FormValidationErrorValue<SignupFormValues> = {
      message: 'Something went wrong, try again later',
    };
    const appErrorCode = extractAppErrorCode(err as AxiosError<ApiErrorData>);

    if (appErrorCode) {
      switch (appErrorCode) {
        case 'AUTH_EMAIL_ALREADY_REGISTERED':
          errValue.input = 'email';
          errValue.message = 'This email is already registered';
          break;

        case 'AUTH_INVALID_EMAIL_FORMAT':
          errValue.input = 'email';
          errValue.message = 'Enter a valid email';
          break;

        case 'AUTH_INVALID_PASSWORD_FORMAT':
          errValue.input = 'newPassword';
          errValue.message = 'Try a stronger password';
          break;

        case 'AUTH_INVALID_DATA_FORMAT':
          errValue.input = 'name';
          errValue.message = 'Try another name';
          break;
      }
    }

    return rejectWithValue(errValue);
  }
});

export type LoginParam = api.LoginRequestBody;

export const login = createAsyncThunk(
  'user/login',
  async (data: LoginParam, { rejectWithValue }) => {
    const { email, password, rememberMe } = data;
    const requestBody = { email, password, rememberMe };

    try {
      const responseData = await api.login(requestBody);
      const { name, email, is_email_verified } = responseData;

      return { name, email, isEmailConfirmed: !!is_email_verified };
    } catch (err) {
      const errValue: FormValidationErrorValue<LoginFormValues> = {
        message: 'Something went wrong, try again later',
      };
      const appErrorCode = extractAppErrorCode(err as AxiosError<ApiErrorData>);

      switch (appErrorCode) {
        case 'EMAIL_NOT_VERIFIED':
          errValue.appErrorCode = appErrorCode;
          break;

        case 'AUTH_INVALID_CREDENTIALS':
          errValue.message = 'Invalid email or password';
      }

      return rejectWithValue(errValue);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await api.logout();
});

export const sendEmailConfirm = createAsyncThunk(
  'user/confirmEmail',
  async (email: string, { rejectWithValue }) => {
    try {
      await api.sendEmailConfirm({ email });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export type ConfirmEmailParam = api.ConfirmEmailRequestBody;

export const confirmEmail = createAsyncThunk(
  'user/confirmEmail',
  async (requestData: ConfirmEmailParam, { rejectWithValue }) => {
    try {
      const responseData = await api.confirmEmail(requestData);
      const { name, email, is_email_verified } = responseData;

      return { name, email, isEmailConfirmed: !!is_email_verified };
    } catch (err) {
      const errValue: FormValidationErrorValue<EmailConfirmFormValues> = {
        message: 'Something went wrong, try again later',
      };
      const appErrorCode = extractAppErrorCode(err as AxiosError<ApiErrorData>);

      if (appErrorCode === 'AUTH_INVALID_CODE') {
        errValue.input = 'code';
        errValue.message = 'Invalid or expired code';
      }

      return rejectWithValue(errValue);
    }
  }
);

export const refresh = createAsyncThunk(
  'user/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const responseData = await api.refresh();
      const { name, email, is_email_verified } = responseData;

      return { name, email, isEmailConfirmed: !!is_email_verified };
    } catch {
      return rejectWithValue(true);
    }
  }
);

export type ResetPasswordData = Pick<
  UserFormFields,
  'email' | 'newPassword' | 'code'
>;

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: ResetPasswordData, { rejectWithValue }) => {
    try {
      const responseData = await api.resetPassword(data);
      const { name, email, is_email_verified } = responseData;

      return { name, email, isEmailConfirmed: !!is_email_verified };
    } catch (err) {
      const errValue: FormValidationErrorValue<ResetPasswordFormValues> = {
        message: 'Something went wrong, try again later',
      };
      const appErrorCode = extractAppErrorCode(err as AxiosError<ApiErrorData>);

      switch (appErrorCode) {
        case 'AUTH_INVALID_PASSWORD_FORMAT':
          errValue.input = 'newPassword';
          errValue.message = 'Try another new password';
          break;

        case 'AUTH_INVALID_CODE':
          errValue.input = 'code';
          errValue.message = 'Invalid code';
      }

      return rejectWithValue(errValue);
    }
  }
);

type NewUserData = {
  name: string;
};

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (newData: NewUserData, { rejectWithValue }) => {
    try {
      const responseData = await api.updateUserData(newData);
      const { name, email, is_email_verified } = responseData;

      return { name, email, isEmailConfirmed: !!is_email_verified };
    } catch {
      const errValue: FormValidationErrorValue<NewUserData> = {
        message: 'Something went wrong, try again later',
      };

      return rejectWithValue(errValue);
    }
  }
);
