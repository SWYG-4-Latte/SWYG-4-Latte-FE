import Button from './Button';

const FooterGradientButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className="from-66.15 fixed bottom-0 left-0 right-0 z-10 mx-auto flex h-24 max-w-[360px] items-center justify-center bg-gradient-to-t from-gray02 px-5">
      <Button className="mb-[30px] mt-4 h-[50px] w-full rounded-lg font-semibold" {...props}>
        {children}
      </Button>
    </div>
  );
};

export default FooterGradientButton;
