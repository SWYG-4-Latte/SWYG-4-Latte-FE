import DrinkHistoryCardFooter from './DrinkHistoryCardFooter';
import DrinkHistoryDetail from './DrinkHistoryDetail';

const EmptyCard = () => {
  return (
    <div className="w-full px-5 pb-8">
      <div className="h-[118px] overflow-hidden rounded-lg border border-gray04 bg-primaryIvory shadow-toast">
        <DrinkHistoryDetail heading="아직 마신 음료가 없어요" description="음료를 기록하고 카페인 정보를 받아보세요." />
        <div className="mx-auto h-px w-[calc(100%-8px)] bg-gray04" />
        <DrinkHistoryCardFooter isEmpty />
      </div>
    </div>
  );
};

export default EmptyCard;
