'use client';

import { useState } from 'react';

import Tooltip from '../common/Tooltip';

const IntakeStandardInfo = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className="relative self-end">
      <button
        className="cursor-pointer self-end text-xs text-gray06 underline underline-offset-2"
        onClick={() => setIsTooltipOpen(true)}
      >
        섭취량 기준 안내
      </button>
      {isTooltipOpen && (
        <Tooltip onClose={() => setIsTooltipOpen(false)}>
          하루 권장 카페인 섭취량은
          <br />
          성인 기준으로 계산됩니다.
        </Tooltip>
      )}
    </div>
  );
};

export default IntakeStandardInfo;
