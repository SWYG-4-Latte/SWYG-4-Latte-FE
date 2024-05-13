import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface MenuSizeTabProps {
  sizes: string[];
  active: string;
}

const MenuSizeTab = ({ sizes, active }: MenuSizeTabProps) => {
  const router = useRouter();

  return (
    <div className="flex h-[41px] border-collapse border-b-2 border-gray04 bg-primaryIvory  px-5">
      {sizes.map((size) => (
        <button
          key={size}
          className={`relative flex h-[41px] w-20 items-center justify-center ${active === size ? 'font-semibold text-primaryOrange' : 'text-gray08'}`}
          onClick={() => {
            router.replace(`?size=${size}`, { scroll: false });
          }}
        >
          <span className="text-nowrap text-xs">{size}</span>
          {active === size && (
            <motion.div
              layoutId="underline"
              transition={{ duration: 0.1 }}
              className="absolute bottom-0 h-[2px] w-20 bg-primaryOrange"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default MenuSizeTab;
