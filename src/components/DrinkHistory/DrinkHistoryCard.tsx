import DrinkHistoryDetail from './DrinkHistoryDetail';
import DrinkHistoryCardFooter from './DrinkHistoryCardFooter';

const DrinkHistoryCard = () => {
  return (
    <div className="h-[118px] w-[229px] overflow-hidden rounded-lg border border-gray04 bg-primaryIvory">
      <DrinkHistoryDetail />
      <div className="mx-auto h-px w-[213px] bg-gray04" />
      <DrinkHistoryCardFooter isEmpty={false} />
    </div>
  );
};

export default DrinkHistoryCard;
