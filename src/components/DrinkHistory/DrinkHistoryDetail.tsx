import { DrinkHistoryDetailProps } from '@/types/home/drinkHistory';

const DrinkHistoryDetail = ({ drinkHistoryData, heading, description }: DrinkHistoryDetailProps) => {
  const drinkName =
    drinkHistoryData &&
    (drinkHistoryData.name.length < 10 ? drinkHistoryData.name : drinkHistoryData.name.slice(0, 10) + '...');

  return (
    <div className="flex gap-2 px-4 py-[15px]">
      <div className="h-12 w-12 rounded-full bg-gray04" />
      <div className="flex flex-col justify-center gap-2">
        <div className="text-sm font-medium text-gray10">{drinkHistoryData ? drinkName : heading}</div>
        <div className="flex items-center text-xs text-gray08">
          {drinkHistoryData ? (
            <>
              <div>{drinkHistoryData.brand}</div>
              <div className="mx-2 h-3 w-px bg-gray06" />
              <div>{drinkHistoryData.caffeineAmount}mg</div>
            </>
          ) : (
            <span>{description}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrinkHistoryDetail;
