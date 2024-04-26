'use client';

import Image from 'next/image';
import { useState } from 'react';

const IntakeStandardInfo = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="cursor-pointer self-end text-xs text-gray06 underline underline-offset-2"
        onClick={() => setIsPopoverOpen(true)}
      >
        섭취량 기준 안내
      </button>
      {isPopoverOpen && (
        <div className="absolute right-0 mt-2 flex gap-3 rounded-lg border border-gray04 bg-primaryIvory px-4 py-2 text-xs leading-[18px] text-gray10 shadow-toast">
          <p className="whitespace-nowrap">
            하루 권장 카페인 섭취량은
            <br />
            성인 기준으로 계산됩니다.
          </p>
          <button className="h-4 w-4" onClick={() => setIsPopoverOpen(false)}>
            <Image src="svgs/close.svg" width={16} height={16} alt="닫기" />
          </button>
        </div>
      )}
    </div>
  );
};

export default IntakeStandardInfo;
