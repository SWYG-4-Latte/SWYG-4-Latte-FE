import { Menu } from '@/types/home/menu';
import RankingListItem from './RankingListItem';

const RankingList = ({ rankingData }: { rankingData: Menu[] }) => {
  return (
    <ul>
      {rankingData.map((menu, idx) => (
        <RankingListItem key={menu.menuNo} ranking={idx + 1} {...menu} />
      ))}
    </ul>
  );
};

export default RankingList;
