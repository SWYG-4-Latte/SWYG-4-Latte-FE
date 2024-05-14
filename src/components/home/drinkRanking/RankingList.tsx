import { useEffect, useState } from 'react';

import RankingListItem from './RankingListItem';
import { Menu } from '@/types/menu/menu';
import RankingListSkeleton from '@/components/common/skeleton/RankingListSkeleton';
import apiInstance from '@/api/instance';

const RankingList = ({ selectedBrand }: { selectedBrand: string }) => {
  const [rankingData, setRankingData] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRankingData = async () => {
      const response = await apiInstance.get(`/menu/ranking/${selectedBrand}`);

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
