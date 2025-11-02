import React from 'react';
import clsx from 'clsx';
import styles from './AppNavLink.module.css';
import { NavLink } from 'react-router';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const AppNavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  className,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(styles.link, { [styles.active]: isActive }, className)
      }
    >
      {children}
    </NavLink>
  );
};
