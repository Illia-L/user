import { Route, Routes } from 'react-router';
import SignupForm from '../SignupForm/SignupForm';
import EmailConfirmPage from '../../pages/EmailConfirmPage/EmailConfirmPage';
import ChangeDataForm from '../ChangeDataForm/ChangeDataForm';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import AccountLayout from '../ui/AccountLayout/AccountLayout';
import NotLoggedInRoute from '../NotLoggedInRoute/NotLoggedInRoute';
import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm';
import ResetPasswordPage from '../../pages/ResetPasswordPage.tsx/ResetPasswordPage';
import LoginForm from '../LoginForm/LoginForm';
import LoggedInLayout from '../ui/LoggedInLayout/LoggedInLayout';
import ConfirmNewEmailForm from '../ConfirmNewEmailForm/ConfirmNewEmailForm';
import ChangeEmailForm from '../ChangeEmailForm/ChangeEmailForm';

export default function Account() {
  return (
    <AccountLayout>
      <Routes>
        <Route element={<NotLoggedInRoute />}>
          <Route
            path='signup'
            element={<SignupForm />}
          />

          <Route
            path='confirm-email'
            element={<EmailConfirmPage />}
          />

          <Route
            path='login'
            element={<LoginForm />}
          />

          <Route
            path='forgot-password'
            element={<ForgotPasswordForm />}
          />

          <Route
            path='reset-password'
            element={<ResetPasswordPage />}
          />
        </Route>

        <Route element={<LoggedInLayout/>}>
          <Route
            path='change-data'
            element={<ChangeDataForm />}
          />
          <Route
            path='change-password'
            element={<ChangePasswordForm />}
          />
          <Route
            path='change-email'
            element={<ChangeEmailForm />}
          />
          <Route
            path='confirm-new-email'
            element={<ConfirmNewEmailForm />}
          />
          <Route
            path='*'
            element={<p>User 404 here</p>}
          />
        </Route>
      </Routes>
    </AccountLayout>
  );
}
