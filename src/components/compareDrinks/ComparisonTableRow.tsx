const ComparisonTableRow = ({ header, data }: { header: string; data: string[] }) => {
  const [drink1Data, drink2Data] = data;

  return (
    <div className="flex h-[53px] w-full items-center justify-end border-t border-gray04 pr-5 last:border-b odd:bg-primaryIvory even:bg-gray02">
      <div className="flex h-full w-[67px] items-center justify-start bg-gray03 pl-5 text-[10px] text-gray08">
        <span className="w-[39px]">{header}</span>
      </div>
      <div className="flex flex-1 justify-center text-xs text-gray10">{drink1Data}</div>
      <div className="h-[37px] w-px bg-gray04" />
      <div className="flex flex-1 justify-center text-xs text-gray10">{drink2Data}</div>
    </div>
  );
};

export default ComparisonTableRow;
