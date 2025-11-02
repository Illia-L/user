import { Route } from 'react-router';
import EmailConfirmPage from './pages/EmailConfirmPage/EmailConfirmPage';
import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import NotLoggedInRoute from './components/NotLoggedInRoute/NotLoggedInRoute';
import ChangeDataForm from './components/ChangeDataForm/ChangeDataForm';
import ChangePasswordForm from './components/ChangePasswordForm/ChangePasswordForm';

const UserRoutes = (
  <>
    <Route element={<NotLoggedInRoute />}>
      <Route
        path='signup'
        element={<SignupForm />}
      />

      <Route
        path='login'
        element={<LoginForm />}
      />

      <Route
        path='confirm-email'
        element={<EmailConfirmPage />}
      />
    </Route>

    <Route
      path='change-data'
      element={<ChangeDataForm />}
    />

    <Route
      path='change-password'
      element={<ChangePasswordForm />}
    />

    {/* <Route
      path='forgot-password'
      element={<p>ForgotPassword here</p>}
    />

    <Route
      path='reset-password'
      element={<p>ResetPassword here</p>}
    />

    <Route
      path='change-password'
      element={<p>ChangePassword here</p>}
    />

    <Route
      path='change-email'
      element={<p>ChangeEmail here</p>}
    />

    <Route
      path='edit-profile'
      element={<p>EditProfile here</p>}
    /> */}

    <Route
      path='*'
      element={<p>User 404 here</p>}
    />
  </>
);

export default UserRoutes;
