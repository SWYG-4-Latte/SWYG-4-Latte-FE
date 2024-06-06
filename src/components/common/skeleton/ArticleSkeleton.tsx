export const ArticleSearchListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, idx) => (
        <ArticleListItemSkeleton key={idx} />
      ))}
    </>
  );
};

export const ArticleListItemSkeleton = () => {
  return (
    <div className="flex min-h-24 animate-pulse items-center gap-4 border-b border-gray04 bg-gray02 px-4 py-4 last:border-none">
      <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-lg bg-gray04"></div>
      <div className="flex flex-col justify-center gap-2">
        <div className="h-4 w-52 rounded bg-gray04"></div>
        <div className="flex h-3 w-36 rounded bg-gray04"></div>
      </div>
    </div>
  );
};

export const RecommendedArticleItemSkeleton = () => {
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

export const ArticleHeroSkeleton = () => {
  return (
    <section className="h-[255px] px-5 py-4">
      <div className="h-40 w-full animate-pulse rounded-lg bg-gray04"></div>
      <div className="mb-4 mt-3 flex animate-pulse flex-col ">
        <div className="h-5 w-56 bg-gray04"></div>
        <div className="mt-2 h-3.5 w-32 bg-gray04"></div>
      </div>
    </section>
  );
};
