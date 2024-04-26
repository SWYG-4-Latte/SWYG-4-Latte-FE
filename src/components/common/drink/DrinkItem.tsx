import Image from 'next/image';

// 음료 이미지와 음료명을 함께 보여주는 컴포넌트(상세 페이지, 비교 페이지 사용)
const DrinkItem = ({ imageUrl, menuName }: { imageUrl: string; menuName: string }) => {
  return (
    <div className="flex h-fit w-[68px] flex-col items-center justify-center gap-2">
      <div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full bg-primaryBeige">
        <Image src={imageUrl} alt={menuName} width={0} height={0} sizes="100vw" className="h-auto w-full" />
      </div>
      <div className="line-clamp-2 text-center text-xs text-gray08">{menuName}</div>
    </div>
  );
};

export default DrinkItem;
