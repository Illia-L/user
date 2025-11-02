// components/Header/Header.tsx
import React from 'react';
import clsx from 'clsx';
import css from './Header.module.css';
// import { Logo } from '../Logo';
import { Nav } from '../Nav/Nav';
import { UserWidget } from '../../../features/user/components/UserWidget/UserWidget';
import type { Theme } from '../../../types/theme';
// import { MenuButton } from '../MenuButton';

interface HeaderProps {
  theme?: Theme;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ theme = 'default', className }) => {
  return (
    <header className={clsx(css.header, css[theme], className)}>
      <div className="container">
        <div className={css.row}>
          {/* <Logo /> */}
          <Nav theme={theme} />
          <UserWidget theme={theme} />
          {/* <MenuButton /> */}
        </div>
      </div>
    </header>
  );
};
