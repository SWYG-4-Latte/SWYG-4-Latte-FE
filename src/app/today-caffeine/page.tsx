import NavigationHeader from '@/components/common/header/NavigationHeader';
import TodayCaffeineContainer from '@/container/todayCaffeine/TodayCaffeineContainer';

export default function TodayCaffeinePage() {
  return (
    <main>
      <NavigationHeader title="오늘 마신 카페인" />
      <TodayCaffeineContainer />
    </main>
  );
}
