const BrandListSkeleton = () => {
  return (
    <>
      <BrandSkeleton />
      <BrandSkeleton />
      <BrandSkeleton />
      <BrandSkeleton />
      <BrandSkeleton />
    </>
  );
};

const BrandSkeleton = () => {
  return (
    <div className="flex h-[70.5px] w-12 animate-pulse  cursor-pointer flex-col items-center justify-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray04"></div>
      <div className="h-2 w-10 rounded bg-gray04"></div>
    </div>
  );
};

export default BrandListSkeleton;
