// components/Header/Header.tsx
import React from 'react';
import clsx from 'clsx';
import css from './Header.module.css';
// import { Logo } from '../Logo';
import { Nav } from '../Nav/Nav';
import { UserWidget } from '../../../features/user/components/UserWidget/UserWidget';
// import { MenuButton } from '../MenuButton';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={clsx(css.header, css.default, className)}>
      <div className='container'>
        <div className={css.row}>
          {/* <Logo /> */}
          <Nav />
          <UserWidget />
          {/* <MenuButton /> */}
        </div>
      </div>
    </header>
  );
};
