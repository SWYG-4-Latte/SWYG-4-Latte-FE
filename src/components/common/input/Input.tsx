'use client';

import { useState } from 'react';

import { cn } from '@/utils/style';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  children?: React.ReactNode;
}

const Input = ({ label, id, error, children, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="my-4 flex flex-col">
      <label htmlFor={id} className="text-xs text-gray10">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'my-2 h-[50px] grow rounded-lg border border-gray05 bg-gray01 px-5 py-4 text-[14px] leading-6 text-gray10 outline-none placeholder:text-gray08',
            error && 'border-primaryRed',
            isFocused && 'border-primaryOrange',
          )}
        />
        {children}
      </div>

      {error && <p className="text-xs text-primaryRed">{error}</p>}
    </section>
  );
};

export default Input;
