// 임시 타입
interface DrinkHistoryDetailProps {
  title?: string;
  brand?: string;
  caffeineAmount?: number;
  description?: string;
}

const DrinkHistoryDetail = ({ title, brand, caffeineAmount, description }: DrinkHistoryDetailProps) => {
  return (
    <div className="flex gap-2 px-4 py-[15px]">
      <div className="h-12 w-12 rounded-full bg-gray04" />
      <div className="flex flex-col justify-center gap-2">
        <div className="text-sm font-medium text-gray10">{title}</div>
        <div className="flex items-center text-xs text-gray08">
          {brand && caffeineAmount && (
            <>
              <div>{brand}</div>
              <div className="mx-2 h-3 w-px bg-gray06" />
              <div>{caffeineAmount}mg</div>
            </>
          )}
          {description && <span>{description}</span>}
        </div>
      </div>
    </div>
  );
};

export default DrinkHistoryDetail;
