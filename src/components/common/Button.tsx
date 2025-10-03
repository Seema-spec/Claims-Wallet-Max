import React, { ReactNode, ButtonHTMLAttributes, HTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'ghost' | 'neutral';
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-4 font-medium transition';
  const styles: Record<string, string> = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg',
    ghost: 'bg-transparent text-blue-600 hover:text-blue-700',
    neutral: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
  };

  return (
    <button className={`${base} ${styles[variant] || styles.primary} ${className}`} {...rest}>
      {children}
    </button>
  );
}