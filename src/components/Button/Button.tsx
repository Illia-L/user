import React from 'react';
import clsx from 'clsx';
import css from './Button.module.css';

type Variant = 'fill' | 'outline' | 'link';
type Color = 'primary' | 'secondary' | 'accent';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: Variant;
  color?: Color;
  size?: Size;
  isLoading?: boolean;
  contrast?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'fill',
      color = 'primary',
      size = 'md',
      isLoading = false,
      contrast = false,
      children,
      ...rest
    },
    ref
  ) => {
    const { className, disabled, type, ...nativeRest } = rest;
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        {...nativeRest}
        type={type ?? 'button'}
        className={clsx(css.base, className, isLoading && css.loading)}
        data-variant={variant}
        data-color={color}
        data-size={size}
        data-contrast={contrast ? 'high' : undefined}
        data-loading={isLoading ? '' : undefined}
        aria-busy={isLoading || undefined}
        disabled={isDisabled}
      >
        {!isLoading && children}
        {isLoading && (
          <span
            className={css.spinner}
            aria-hidden='true'
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
