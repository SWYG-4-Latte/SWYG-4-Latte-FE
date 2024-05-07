import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

interface MenuSizeTabProps {
  sizes: string[];
  active: string;
}

const MenuSizeTab = ({ sizes, active }: MenuSizeTabProps) => {
  const router = useRouter();

  return (
    <div className="flex h-[41px] border-collapse border-b-2 border-gray04 bg-primaryIvory  px-5">
      {sizes.map((size) => (
        <div
          key={size}
          className={`flex h-[41px] w-20 border-collapse cursor-pointer items-center justify-center border-b-2 ${active === size ? 'border-primaryOrange font-semibold text-primaryOrange' : 'border-gray04 text-gray08'}`}
          onClick={() => {
            router.replace(`?size=${size}`);
          }}
        >
          <span className={`text-nowrap text-xs `}>{size}</span>
        </div>
      ))}
    </div>
  );
};

export default MenuSizeTab;
