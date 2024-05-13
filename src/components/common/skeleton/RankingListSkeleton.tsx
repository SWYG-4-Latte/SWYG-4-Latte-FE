const RankingListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <RankingItemSkeleton key={idx} rank={idx + 1} />
      ))}
    </>
  );
};

const RankingItemSkeleton = ({ rank }: { rank: number }) => {
  return (
    <div className="flex animate-pulse items-center border-b border-gray04 bg-gray02 px-5 py-6 last:border-none even:bg-gray01">
      <span className="text-base font-semibold text-primaryOrange">{rank}</span>
      <div className="mx-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray04"></div>
      <div className="flex flex-col justify-center gap-2">
        <div className="h-4 w-28 rounded bg-gray04 text-sm font-medium text-gray10"></div>
        <div className="flex h-2 w-36 items-center rounded bg-gray04"></div>
      </div>
    </div>
  );
};

export default RankingListSkeleton;
