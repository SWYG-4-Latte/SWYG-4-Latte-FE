const CardSkeleton = () => {
  return (
    <div className="h-[118px] min-w-[250px] overflow-hidden rounded-lg border border-gray04 bg-primaryIvory shadow-toast">
      <div className="flex animate-pulse gap-2 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray04"></div>
        <div className="flex flex-col justify-center gap-2">
          <div className="h-3 w-20 bg-gray04"> </div>
          <div className="h-2 w-36 bg-gray04"></div>
        </div>
      </div>
      <div className="mx-auto h-px w-[234px] bg-gray04" />
    </div>
  );
};

const DrinkHistoryCardSkeleton = () => {
  return (
    <div className="flex gap-2 overflow-hidden pb-8 pl-5">
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default DrinkHistoryCardSkeleton;
