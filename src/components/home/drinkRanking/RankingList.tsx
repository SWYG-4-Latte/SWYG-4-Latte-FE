import { useEffect, useState } from 'react';
import axios from 'axios';

import RankingListItem from './RankingListItem';
import { Menu } from '@/types/menu/menu';
import RankingListSkeleton from '@/components/common/skeleton/RankingListSkeleton';

const RankingList = ({ selectedBrand }: { selectedBrand: string }) => {
  const [rankingData, setRankingData] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRankingData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/ranking/${selectedBrand}`);

      setRankingData(response.data.data);
      setIsLoading(false);
    };

    getRankingData();
  }, [selectedBrand]);

  return (
    <ul className="mt-2">
      {isLoading && <RankingListSkeleton />}
      {!isLoading && rankingData.map((menu, idx) => <RankingListItem key={menu.menuNo} ranking={idx + 1} {...menu} />)}
    </ul>
  );
};

export default RankingList;
