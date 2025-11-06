import axios from 'axios';

axios.defaults.baseURL = 'https://zoshyt.online/api/users';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.patch['Accept'] = 'application/json';

type AuthenticationResponseBody = {
  user_id: number;
  name: string;
  email: string;
  is_email_verified: 0 | 1;
  created_at: string;
  is_active: 0 | 1;
};

type SignupRequestBody = {
  email: string;
  name: string;
  password: string;
  rememberMe: string;
};

export async function signup(
  data: SignupRequestBody
): Promise<AuthenticationResponseBody> {
  const response = await axios.post<AuthenticationResponseBody>(
    '/registration',
    data
  );

  return response.data;
}

export type LoginRequestBody = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export async function login(
  data: LoginRequestBody
): Promise<AuthenticationResponseBody> {
  const response = await axios.post<AuthenticationResponseBody>('/login', data);

  return response.data;
}

export async function logout(): Promise<void> {
  await axios.post('/logout');
}

type SendEmailConfirmRequestBody = {
  email: string;
};

export async function sendEmailConfirm(
  data: SendEmailConfirmRequestBody
): Promise<void> {
  await axios.post('/resend-confirmation-code', data);
}

export type ConfirmEmailRequestBody = {
  email: string;
  code: number;
  rememberMe: number;
};

export async function confirmEmail(
  data: ConfirmEmailRequestBody
): Promise<AuthenticationResponseBody> {
  const response = await axios.post<AuthenticationResponseBody>(
    '/confirm-email',
    data
  );

  return response.data;
}

export async function refresh(): Promise<AuthenticationResponseBody> {
  const response = await axios.get<AuthenticationResponseBody>('/me');

  return response.data;
}

type ForgotPasswordRequestBody = {
  email: string;
};

export async function forgotPassword(
  data: ForgotPasswordRequestBody
): Promise<void> {
  await axios.post('/forgot-password', data);
}

type ResetPasswordRequestBody = {
  email: string;
  newPassword: string;
  code: string;
};

export async function resetPassword(
  data: ResetPasswordRequestBody
): Promise<AuthenticationResponseBody> {
  const response = await axios.post<AuthenticationResponseBody>(
    '/reset-password',
    data
  );

  return response.data;
}

type ChangePasswordRequestBody = {
  password: string;
  newPassword: string;
};

export async function changePassword(
  data: ChangePasswordRequestBody
): Promise<void> {
  await axios.patch('/change-password', data);
}

type ChangeEmailRequestBody = {
  email: string;
};

export async function changeEmail(data: ChangeEmailRequestBody): Promise<void> {
  await axios.patch('/change-email', data);
}

type ConfirmNewEmailRequestBody = {
  password: string;
  code: string;
};

export async function confirmNewEmail(
  data: ConfirmNewEmailRequestBody
): Promise<AuthenticationResponseBody> {
  const response = await axios.patch<AuthenticationResponseBody>(
    '/confirm-new-email',
    data
  );

  return response.data;
}

type UpdateDataRequestBody = {
  name: string;
};

export async function updateUserData(
  data: UpdateDataRequestBody
): Promise<AuthenticationResponseBody> {
  const response = await axios.patch<AuthenticationResponseBody>(
    '/update',
    data
  );

  return response.data;
}
