import React, { ReactNode, ButtonHTMLAttributes, HTMLAttributes } from 'react';

/** Label Component */
interface LabelProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
}

export function Label({ as: As = 'p', className = '', children, ...rest }: LabelProps) {
  return (
    <As
      className={`leading-relaxed text-gray-900 dark:text-gray-100 ${className}`}
      {...rest}
    >
      {children}
    </As>
  );
}