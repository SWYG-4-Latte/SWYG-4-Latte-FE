import Link from 'next/link';

import NavigationHeader from '@/components/common/header/NavigationHeader';
import MenuDetailContainer from '@/container/menuDetail/MenuDetailContainer';
import apiInstance from '@/api/instance';
import HomeIcon from '@/components/common/icons/HomeIcon';

export default async function MenuDetailPage({ params }: { params: { menuNo: string } }) {
  const menuNo = Number(params.menuNo);
  const { data: menuDetail } = await apiInstance.get(`/menu/detail/${menuNo}`);

  return (
    <>
      <NavigationHeader>
        <Link href="/home" className="absolute right-5">
          <HomeIcon className="text-gray10" />
        </Link>
      </NavigationHeader>
      <MenuDetailContainer {...menuDetail} />
    </>
  );
}
