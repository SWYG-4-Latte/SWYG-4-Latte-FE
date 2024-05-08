import Image from 'next/image';

const NoSearchResults = () => {
  return (
    <div className="flex h-[calc(100dvh-148px)] flex-col items-center justify-center overflow-hidden">
      <Image
        src="/svgs/no-search-results.svg"
        alt="검색 결과 없음"
        priority
        sizes="100vw"
        width={0}
        height={0}
        className="h-auto w-auto"
      />
      <div className="my-6 flex flex-col items-center justify-center gap-2 text-gray08">
        <p>검색 결과가 없습니다.</p>
        <p className="text-sm leading-6">다른 키워드로 검색해보세요.</p>
      </div>
    </div>
  );
};

export default NoSearchResults;
