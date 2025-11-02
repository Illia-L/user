// components/Copyright/Copyright.tsx
import React from 'react';
import clsx from 'clsx';
import styles from './Copyright.module.css';
import type { Theme } from '../../../types/theme';

interface CopyrightProps {
  theme: Theme;
  className?: string;
}

export const Copyright: React.FC<CopyrightProps> = ({
  theme,
  className,
}) => {
  return (
    <span className={clsx(styles.copy, styles[theme], className)}>
      © {new Date().getFullYear()} Company Name
    </span>
  );
};
