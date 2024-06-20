'use client';

import { useState } from 'react';

import { cn } from '@/utils/style';
import Image from 'next/image';

import EyeOnIcon from '/public/svgs/eye-on.svg';
import EyeOffIcon from '/public/svgs/eye-off.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean | null;
  bottomMessage?: string | boolean;
}

const Input = ({ label, error, bottomMessage, type, value, id, className, children, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="mb-4 flex flex-col">
      {label && (
        <label htmlFor={id} className="mb-2 text-xs text-gray10">
          {label}
        </label>
      )}

      <div className={cn('relative flex items-center', label && 'gap-2')}>
        <input
          value={value}
          type={showPassword ? 'text' : type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'h-[50px] min-w-[236px] grow rounded-lg border border-gray05 bg-gray01 py-4 pl-5 text-[14px] leading-6 text-gray10 outline-none placeholder:text-gray08',
            error && 'border-primaryRed',
            isFocused && !error && 'border-primaryOrange',
            className,
          )}
          {...props}
        />

        {type === 'password' && value && (
          <button type="button" className="absolute right-4" onClick={() => setShowPassword((prev) => !prev)}>
            <Image src={showPassword ? EyeOnIcon : EyeOffIcon} alt={showPassword ? '비밀번호 표시' : '비밀번호 숨김'} />
          </button>
        )}

        {/* Input 오른쪽에 들어갈 버튼 넣는 용도 */}
        {children}
      </div>

      {(error || bottomMessage) && (
        <p className={cn('mt-2 text-xs text-primaryOrange', error && 'text-primaryRed')}>{bottomMessage || error}</p>
      )}
    </section>
  );
};

export default Input;
