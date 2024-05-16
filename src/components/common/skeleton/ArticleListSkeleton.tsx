// 아티클 검색 페이지 추천 아티클 리스트에서 사용

const ArticleListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <ArticleItemSkeleton key={idx} />
      ))}
    </>
  );
};

const ArticleItemSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-3  py-4">
      <div className="h-40 w-full rounded-lg bg-gray04"></div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-80 rounded bg-gray04"></div>
        <div className="h-4 w-36 rounded bg-gray04"></div>
      </div>
    </div>
  );
};

export default ArticleListSkeleton;
