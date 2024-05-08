const SearchListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, idx) => (
        <SearchListItemSkeleton key={idx} />
      ))}
    </>
  );
};

export const SearchListItemSkeleton = () => {
  return (
    <div className="flex min-h-24 animate-pulse items-center gap-4 border-b border-gray04 bg-gray02 px-4 py-4 last:border-none odd:bg-gray03">
      <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-gray04"></div>
      <div className="flex flex-col justify-center gap-2">
        <div className="h-4 w-40 rounded bg-gray04"></div>
        <div className="h-3 w-52 rounded bg-gray04"></div>
      </div>
    </div>
  );
};

export default SearchListSkeleton;
