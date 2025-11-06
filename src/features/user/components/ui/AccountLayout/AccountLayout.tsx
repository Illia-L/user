import css from './AccountLayout.module.css';
import type { ReactNode } from 'react';

type AccountLayoutProps = {
  children: ReactNode;
};

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className={css.box}>
      {children}
    </div>
  );
}
