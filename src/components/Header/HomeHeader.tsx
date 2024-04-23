import Image from 'next/image';
import Link from 'next/link';

const HomeHeader = () => {
  return (
    <header className="fixed z-10 flex h-14 justify-between space-x-44 bg-primaryIvory pl-5 pr-[22px]">
      {/* 로고 이미지 변경 예정 */}
      <Image src="/svgs/logo.svg" width={78} height={40} alt="로고" className="my-2" />
      <div className="my-4 flex gap-4">
        <Link href="/search">
          <Image src="/svgs/search.svg" width={24} height={24} alt="검색 아이콘" />
        </Link>
        <Link href="/mypage">
          <Image src="/svgs/mypage.svg" width={24} height={24} alt="마이페이지 아이콘" />
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
