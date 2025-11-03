import React from 'react';
import clsx from 'clsx';
import css from './Footer.module.css';
import { Copyright } from '../Copyright/Copyright';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={clsx(css.footer, css.default, className)}>
      <div className='container'>
        <div className={css.row}>
          <Copyright />
        </div>
      </div>
    </footer>
  );
};
