import { Menu } from '@/types/home/menu';
import DrinkListItem from '../common/drink/DrinkListItem';

const HistoryList = ({ drinkList }: { drinkList: Menu[] }) => {
  return (
    <ul>
      {drinkList.map((menu) => (
        <DrinkListItem key={menu.menuNo} drinkMenu={menu} />
      ))}
    </ul>
  );
};

export default HistoryList;
