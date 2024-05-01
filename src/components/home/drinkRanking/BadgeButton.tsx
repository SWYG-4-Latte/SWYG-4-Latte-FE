import { BadgeButtonProps } from '@/types/home/button';

const BadgeButton = ({ children, selected, className, ...props }: BadgeButtonProps) => {
  let buttonStyle = 'border-gray05 bg-gray01 text-gray08';
  if (selected) {
    buttonStyle = 'border-primaryOrange bg-orange01 text-primaryOrange';
  }

  return (
    <button
      className={`flex h-[30px] items-center rounded-md border px-4 py-2 text-xs ${buttonStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default BadgeButton;
