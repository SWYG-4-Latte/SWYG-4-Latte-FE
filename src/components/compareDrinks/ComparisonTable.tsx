import { ComparedMenu } from '@/types/home/menu';
import ComparisonTableRow from './ComparisonTableRow';

const ComparisonTable = ({ drinks }: { drinks: (ComparedMenu | null)[] }) => {
  const caffeineData = drinks.map((drink) => drink?.caffeine ?? '-');
  const priceData = drinks.map((drink) => (drink ? `${drink.price.toLocaleString('ko-KR')}원` : '-'));
  const allergyData = drinks.map((drink) => drink?.allergy ?? '-');
  const kcalData = drinks.map((drink) => drink?.kcal ?? '-');

  return (
    <div className="flex flex-col">
      <ComparisonTableRow header="카페인" data={caffeineData} />
      <ComparisonTableRow header="가격" data={priceData} />
      <ComparisonTableRow header="알레르기 유발요인" data={allergyData} />
      <ComparisonTableRow header="칼로리" data={kcalData} />
    </div>
  );
};

export default ComparisonTable;
