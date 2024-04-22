import DrinkHistoryDetail from './DrinkHistoryDetail';
import DrinkHistoryCardFooter from './DrinkHistoryCardFooter';
import { DrinkHistoryData } from '@/types/home/drinkHistory';

const DrinkHistoryCard = ({ drinkHistoryData, isEmpty }: { drinkHistoryData?: DrinkHistoryData; isEmpty: boolean }) => {
  return (
    <div className="h-[118px] w-[229px] overflow-hidden rounded-lg border border-gray04 bg-primaryIvory">
      {isEmpty ? (
        <DrinkHistoryDetail heading="마신 음료를 추가해봐요" description="빠르게 기록할 수 있어요" />
      ) : (
        <DrinkHistoryDetail drinkHistoryData={drinkHistoryData} />
      )}
      <div className="mx-auto h-px w-[213px] bg-gray04" />
      <DrinkHistoryCardFooter isEmpty={isEmpty} />
    </div>
  );
};

export default DrinkHistoryCard;
