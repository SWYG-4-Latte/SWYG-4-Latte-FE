import { cn } from '@/utils/style';

const InputCheckButton = ({ children, disabled, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className={cn(
        'h-[50px] min-w-[76px] text-nowrap rounded-lg bg-gray09 px-3 py-4 text-[14px] font-medium text-gray00',
        disabled && 'bg-gray04 text-gray06',
        !disabled && 'hover:bg-primaryDark',
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default InputCheckButton;
