import React, { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, fullWidth = false, ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-dark dark:text-white mb-1">
            {label}
          </label>
        )}
        <input
          className={twMerge(
            'px-4 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-lighter dark:text-white dark:border-gray-700',
            error ? 'border-error focus:ring-error' : '',
            fullWidth ? 'w-full' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';