interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center bg-primaryOrange text-gray00 hover:bg-primaryAmber disabled:bg-orange02 disabled:text-gray06 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
