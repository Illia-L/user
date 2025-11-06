import css from './LoggedInLayout.module.css';
import AccountMenu from '../../AccountMenu/AccountMenu';
import { useAppSelector } from '../../../../../redux/hooks';
import { selectIsLoggedIn } from '../../../redux/selectors';
import { Outlet } from 'react-router';

export default function LoggedInLayout() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <>
      <aside
        className={css.sidebar}
        aria-labelledby='account-nav-title'
      >
        <h2
          id='account-nav-title'
          className={css.srOnly}
        >
          Account navigation
        </h2>

        {isLoggedIn && <AccountMenu />}
      </aside>

      <main className={css.content}>
        <Outlet />
      </main>

      <div
        className={css.spacer}
        aria-hidden='true'
      />
    </>
  );
}
