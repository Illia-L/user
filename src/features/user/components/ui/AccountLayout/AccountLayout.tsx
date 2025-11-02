import css from './AccountLayout.module.css';
import AccountMenu from '../../AccountMenu/AccountMenu';
import type { ReactNode } from 'react';

type AccountLayoutProps = {
  children: ReactNode;
};

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className={css.wrap}>
      <aside
        className={css.menu}
        aria-labelledby='account-nav-title'
      >
        <h2
          id='account-nav-title'
          className={css.srOnly}
        >
          Account navigation
        </h2>
        <AccountMenu />
      </aside>

      <main className={css.content}>{children}</main>

      <div
        className={css.spacer}
        aria-hidden='true'
      />
    </div>
  );
}
