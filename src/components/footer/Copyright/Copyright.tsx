// components/Copyright/Copyright.tsx
import React from 'react';
import clsx from 'clsx';
import styles from './Copyright.module.css';

interface CopyrightProps {
  className?: string;
}

export const Copyright: React.FC<CopyrightProps> = ({
  className,
}) => {
  return (
    <span className={clsx(styles.copy, className)}>
      © {new Date().getFullYear()} Company Name
    </span>
  );
};
