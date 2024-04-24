import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import CaffeineComparisonContainer from '@/container/menuDetail/CaffeineComparisonContainer';
import MenuInfoContainer from '@/container/menuDetail/MenuInfoContainer';

export default function MenuDetailPage({ params }: { params: { menuNo: string } }) {
  const menuNo = params.menuNo;

  return (
    <div className="pt-14">
      <MenuInfoContainer menuNo={Number(menuNo)} />
      <CaffeineComparisonContainer menuNo={Number(menuNo)} />
      <FooterGradientButton>오늘 마신 카페인으로 기록하기</FooterGradientButton>
    </div>
  );
}
