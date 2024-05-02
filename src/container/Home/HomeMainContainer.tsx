import HomeBanner from '@/components/home/banner/HomeBanner';
import DrinkHistoryContainer from './DrinkHistoryContainer';

const DATA = {
  status: '적정',
  today: '10mg',
  interval: '238mg',
  recent: [
    {
      menuNo: 345,
      menuName: '유자에이드(ICED)',
      brand: '빽다방',
      caffeine: '0mg',
      menuSize: '기본(24oz)',
      imageUrl: 'https://paikdabang.com/wp-content/uploads/2018/06/유자에이드-1-450x588.png',
    },
  ],
};

const HomeMainContainer = () => {
  const { recent, ...data } = DATA;
  const isLoggedIn = true;

  return (
    <>
      <HomeBanner caffeineData={isLoggedIn ? data : null} />
      <DrinkHistoryContainer drinkHistory={isLoggedIn ? recent : []} />
    </>
  );
};

export default HomeMainContainer;
