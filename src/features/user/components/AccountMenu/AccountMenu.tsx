import css from './AccountMenu.module.css';
import Logout from '../Logout/Logout';
import { useAppSelector } from '../../../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/selectors';
import AppNavLink from '../../../../components/AppNavLink/AppNavLink';

export default function AccountMenu() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <nav
      className={css.nav}
      aria-label='Account menu'
    >
      <ul className={css.list}>
        {!isLoggedIn && (
          <>
            <li>
              <AppNavLink to='/account/signup'>Signup</AppNavLink>
            </li>

            <li>
              <AppNavLink to='/account/login'>Login</AppNavLink>
            </li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li>
              <AppNavLink to='/account/profile'>View Profile</AppNavLink>
            </li>

            <li className={css.itemWithSpaceBefore}>
              <AppNavLink to='/account/change-data'>Change name</AppNavLink>
            </li>

            <li>
              <AppNavLink to='/account/change-email'>Change email</AppNavLink>
            </li>

            <li>
              <AppNavLink to='/account/change-password'>Change password</AppNavLink>
            </li>

            <li className={css.itemWithSpaceBefore}>
              <Logout />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
