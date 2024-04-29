const PopularSearchItem = ({ rank, word }: { rank: number; word: string }) => {
  return (
    <div className="flex items-center gap-4 border-b border-gray04 px-5 py-4 last:border-none">
      <div className="font-semibold text-gray10">{rank}</div>
      <div className="text-sm text-gray08">{word}</div>
    </div>
  );
};

export default PopularSearchItem;
