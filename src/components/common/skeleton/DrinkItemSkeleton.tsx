const DrinkItemSkeleton = ({ length }: { length: number }) => {
  return (
    <>
      {Array.from({ length: length }).map((_, idx) => (
        <div key={idx} className="flex h-fit w-[68px] animate-pulse flex-col items-center justify-center gap-2">
          <div className="flex h-[68px] w-[68px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray04"></div>
          <div className="h-2 w-10 rounded bg-gray04"></div>
        </div>
      ))}
    </>
  );
};

export default DrinkItemSkeleton;
