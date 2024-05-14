import NavigationHeader from '@/components/common/header/NavigationHeader';
import MenuDetailContainer from '@/container/menuDetail/MenuDetailContainer';
import apiInstance from '@/api/instance';

export default async function MenuDetailPage({ params }: { params: { menuNo: string } }) {
  const menuNo = Number(params.menuNo);
  const { data: menuDetail } = await apiInstance.get(`/menu/detail/${menuNo}`);

  return (
    <>
      <NavigationHeader />
      <MenuDetailContainer {...menuDetail} />
    </>
  );
}
