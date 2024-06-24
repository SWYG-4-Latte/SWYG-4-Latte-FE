import Link from 'next/link';
import { Metadata } from 'next';

import NavigationHeader from '@/components/common/header/NavigationHeader';
import MenuDetailContainer from '@/container/menuDetail/MenuDetailContainer';
import apiInstance from '@/api/instance';
import HomeIcon from '@/components/common/icons/HomeIcon';

interface MenuDetailPageProps {
  params: { menuNo: string };
}

export async function generateMetadata({ params }: MenuDetailPageProps): Promise<Metadata> {
  const menuNo = Number(params.menuNo);
  const {
    data: { data: menuDetail },
  } = await apiInstance.get(`/menu/detail/${menuNo}`);

  return {
    title: menuDetail.menuName,
    description:
      '특정 음료의 카페인 함량 및 영양 정보를 확인할 수 있고, 비교함에 담을 수 있습니다. 해당 음료 대비 카페인 함량 낮은 음료를 확인할 수 있습니다.',
    keywords: '카페인 함량, 영양정보, 카페인 함량 낮은 음료, 비교하러 가기',
  };
}

export default async function MenuDetailPage({ params }: MenuDetailPageProps) {
  const menuNo = Number(params.menuNo);
  const {
    data: { data: menuDetail },
  } = await apiInstance.get(`/menu/detail/${menuNo}`);

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
