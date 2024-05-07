import axios from 'axios';

import NavigationHeader from '@/components/common/header/NavigationHeader';
import MenuDetailContainer from '@/container/menuDetail/MenuDetailContainer';

export default async function MenuDetailPage({ params }: { params: { menuNo: string } }) {
  const menuNo = Number(params.menuNo);
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/detail/${menuNo}`);
  const menuDetail = response.data.data;

  return (
    <main>
      <NavigationHeader />
      <MenuDetailContainer {...menuDetail} />
    </main>
  );
}
