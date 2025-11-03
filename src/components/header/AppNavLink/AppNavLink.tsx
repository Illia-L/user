import React from 'react';
import clsx from 'clsx';
import css from './AppNavLink.module.css';
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
        clsx(css.link, css.default, { [css.active]: isActive }, className)
      }
    >
      {children}
    </NavLink>
  );
};
