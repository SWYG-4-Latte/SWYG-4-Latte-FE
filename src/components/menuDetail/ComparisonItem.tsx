import Image from 'next/image';

import { Menu } from '@/types/home/menu';

const ComparisonItem = ({ drink, onDelete }: { drink: Menu | null; onDelete: ((menuNo: number) => void) | null }) => {
  const handleDelete = () => {
    if (drink && onDelete) {
      onDelete(drink.menuNo);
    }
  };

  return (
    <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden">
      <Image
        src={drink ? drink.imageUrl : '/svgs/beverage.svg'}
        width={0}
        height={0}
        sizes="100vw"
        className="h-full w-20 rounded-full bg-primaryBeige"
        alt="비교함 음료"
      />
      {drink && (
        <button className="absolute right-0 top-2" onClick={handleDelete}>
          <Image src="/svgs/delete-icon.svg" width={16} height={16} alt="비교함에서 삭제" />
        </button>
      )}
    </div>
  );
};

export default ComparisonItem;
