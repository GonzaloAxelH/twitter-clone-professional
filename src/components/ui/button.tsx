import React, { forwardRef } from 'react';
import cn from 'clsx';
import type { ComponentPropsWithRef } from 'react';
type ButtonProps = ComponentPropsWithRef<'button'> & {
  loading?: boolean;
};
// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading, disabled, children, ...rest }, ref) => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const isDisabled = loading || disabled;

    return (
      <button
        className={cn(
          'custom-button main-tab',
          loading && 'relative !text-transparent disabled:cursor-wait',
          className
        )}
        disabled={isDisabled}
        ref={ref}
        type='button'
        {...rest}
      >
        {loading && <span></span>}
        {children}
      </button>
    );
  }
);
