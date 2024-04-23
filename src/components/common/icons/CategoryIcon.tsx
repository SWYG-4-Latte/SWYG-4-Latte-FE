const CategoryIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" className={className}>
    <rect width={17} height={2} x={3} y={18} fill="currentColor" rx={1} />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16 6H5v5a4 4 0 0 0 4 4h3a4 4 0 0 0 4-4V6ZM5 4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6h3a6 6 0 0 0 6-6V6a2 2 0 0 0-2-2H5Z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M17 14h.2A4.8 4.8 0 0 0 22 9.2 3.2 3.2 0 0 0 18.8 6H17v2h1.8A1.2 1.2 0 0 1 20 9.2a2.8 2.8 0 0 1-2.8 2.8H17v2Z"
      clipRule="evenodd"
    />
  </svg>
);
export default CategoryIcon;
