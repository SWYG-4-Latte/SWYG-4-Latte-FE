import Image from 'next/image';
import Link from 'next/link';

const HomeHeader = () => {
  return (
    <header className="fixed left-0 right-0 z-10 mx-auto flex h-14 max-w-[500px] justify-between space-x-44 bg-primaryIvory pl-5 pr-[22px]">
      {/* 로고 이미지 변경 예정 */}
      <Image src="/svgs/logo.svg" width={78} height={40} alt="로고" className="my-2" />
      <div className="my-4 flex gap-4">
        <Link href="/search" scroll={false}>
          <Image src="/svgs/search.svg" width={24} height={24} alt="검색 아이콘" />
        </Link>
        <Link href="/mypage" scroll={false}>
          <Image src="/svgs/mypage.svg" width={24} height={24} alt="마이페이지 아이콘" />
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
