const DownArrowIcon = ({ className }: { className: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.146 3.896a.5.5 0 0 1 .708 0L6 7.043l3.146-3.147a.5.5 0 1 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 0-.708Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default DownArrowIcon;
