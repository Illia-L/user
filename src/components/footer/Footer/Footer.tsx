// components/Footer/Footer.tsx
import React from 'react';
import clsx from 'clsx';
import styles from './Footer.module.css';
import { Copyright } from '../Copyright/Copyright';
import type { Theme } from '../../../types/theme';

interface FooterProps {
  theme?: Theme;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  theme = 'default',
  className,
}) => {
  return (
    <footer className={clsx(styles.footer, styles[theme], className)}>
      <div className='container'>
        <div className={styles.row}>
          <Copyright theme={theme} />
        </div>
      </div>
    </footer>
  );
};
