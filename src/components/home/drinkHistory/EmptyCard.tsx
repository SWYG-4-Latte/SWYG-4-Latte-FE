import DrinkHistoryCardFooter from './DrinkHistoryCardFooter';
import DrinkHistoryDetail from './DrinkHistoryDetail';

const EmptyCard = () => {
  return (
    <div className="h-[118px] w-80 overflow-hidden rounded-lg border border-gray04 bg-primaryIvory">
      <DrinkHistoryDetail heading="아직 마신 음료가 없어요" description="음료를 기록하고 카페인 정보를 받아보세요." />
      <div className=" mx-auto h-px w-[303px] bg-gray04" />
      <DrinkHistoryCardFooter isEmpty />
    </div>
  );
};

export default EmptyCard;
