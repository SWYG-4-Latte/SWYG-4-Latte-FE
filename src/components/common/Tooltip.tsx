import Image from 'next/image';
import { PropsWithChildren, useRef } from 'react';

import useOutsideClick from '@/hooks/useOutsideClick';

const Tooltip = ({ children, onClose }: PropsWithChildren<{ onClose: () => void }>) => {
  const tooltipRef = useRef(null);
  useOutsideClick(tooltipRef, () => onClose());

  return (
    <div
      ref={tooltipRef}
      className="absolute right-0 flex gap-3 rounded-lg border border-gray04 bg-primaryIvory px-4 py-2 shadow-toast"
    >
      <p className="whitespace-nowrap text-xs leading-[18px] text-gray10 ">{children}</p>
      <button className="h-4 w-4" onClick={onClose}>
        <Image src="/svgs/close.svg" width={16} height={16} alt="닫기" />
      </button>
    </div>
  );
};

export default Tooltip;
