import NavItem from './NavItem';

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 mx-auto h-20 max-w-[500px] bg-primaryIvory shadow-nav">
      <div className="absolute left-0 top-0 h-px w-full bg-gray04" />
      <div className="flex justify-between px-5 pb-[30px] pt-2">
        <NavItem path="/home" name="홈" />
        <NavItem path="/menu" name="카테고리" />
        <NavItem path="/caffeine-calendar" name="카페인 달력" />
        <NavItem path="/article" name="아티클" />
      </div>
    </nav>
  );
};

export default BottomNavigation;
