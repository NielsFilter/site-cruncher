import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  className, 
  children, 
  hoverable = false,
  ...props 
}) => {
  return (
    <div 
      className={twMerge(
        'bg-white dark:bg-dark-lighter rounded-lg shadow-md overflow-hidden',
        hoverable && 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div 
      className={twMerge(
        'p-4 border-b dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <h3 
      className={twMerge(
        'text-lg font-semibold text-dark dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div 
      className={twMerge(
        'p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div 
      className={twMerge(
        'p-4 border-t dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};