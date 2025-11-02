import React from 'react';
import clsx from 'clsx';
import styles from './Nav.module.css';
import { AppNavLink } from '../AppNavLink/AppNavLink';

interface NavProps {
  className?: string;
}

export const Nav: React.FC<NavProps> = ({ className }) => {
  return (
    <nav className={clsx(styles.nav, className)} aria-label="Primary">
      <AppNavLink to="/">Home</AppNavLink>
      <AppNavLink to="/page-1">Page-1</AppNavLink>
    </nav>
  );
};
