import React from 'react';
import clsx from 'clsx';
import css from '../Button/Button.module.css';
import { Link } from 'react-router';

type Variant = 'fill' | 'outline' | 'link';
type Color = 'primary' | 'secondary' | 'accent';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  variant?: Variant;
  color?: Color;
  size?: Size;
  contrast?: boolean;
  to: string;
  state?: object;
}

export const AppLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      to,
      state,
      variant = 'link',
      color = 'primary',
      size = 'md',
      contrast = false,
      children,
      ...rest
    },
    ref
  ) => {
    const { className, ...nativeRest } = rest;

    return (
      <Link
        to={to}
        state={state}
        ref={ref}
        {...nativeRest}
        className={clsx(css.base, className)}
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-contrast={contrast ? 'high' : undefined}
      >
        {children}
      </Link>
    );
  }
);
