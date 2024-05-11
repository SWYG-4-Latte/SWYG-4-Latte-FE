import axios from 'axios';
import dayjs from 'dayjs';

import NavigationHeader from '@/components/common/header/NavigationHeader';
import TodayCaffeineContainer from '@/container/todayCaffeine/TodayCaffeineContainer';

export const dynamic = 'force-dynamic';

export default async function TodayCaffeinePage() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/drink/date/menu`, {
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
