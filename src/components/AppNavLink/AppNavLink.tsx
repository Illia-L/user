import type { ReactNode } from 'react';
import css from './AppNavLink.module.css';
import { NavLink } from 'react-router';

interface AppNavLinkProps {
  to: string;
  children?: ReactNode;
}

function AppNavLink({ children, to }: AppNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${css.link} ${css.active}` : css.link
      }
    >
      {children}
    </NavLink>
  );
}

export default AppNavLink;
