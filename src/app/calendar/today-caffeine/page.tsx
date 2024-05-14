import dayjs from 'dayjs';

import NavigationHeader from '@/components/common/header/NavigationHeader';
import TodayCaffeineContainer from '@/container/todayCaffeine/TodayCaffeineContainer';
import apiInstance from '@/api/instance';

export const dynamic = 'force-dynamic';

export default async function TodayCaffeinePage() {
  const response = await apiInstance.get('/drink/date/menu', {
    params: {
      datetime: dayjs().format('YYYY-MM-DDT00:00:00'),
    },
  });

  const todayCaffeineData = response.data.data;
  return (
    <>
      <NavigationHeader title="오늘 마신 카페인" />
      <TodayCaffeineContainer data={todayCaffeineData} />
    </>
  );
}
