'use client';

import { PropsWithChildren, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Portal from './Portal';
import useOutsideClick from '@/hooks/useOutsideClick';

/**
 * 일반 모달: 아래에서 위로 올라오는 효과
 * 음료 추천 모달: fade in, fade out 효과만
 */
const modalVariants = {
  hidden: {
    y: '100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
  },
  recommendationHidden: {
    opacity: 0,
  },
  recommendationVisible: {
    opacity: 1,
  },
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRecommendationModal?: boolean;
}

const Backdrop = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      className="fixed z-50 flex h-screen w-full max-w-[500px] flex-col items-center justify-center bg-gray09 bg-opacity-70"
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const CommentModal = ({ isOpen, onClose, children, isRecommendationModal = false }: PropsWithChildren<ModalProps>) => {
  const modalRef = useRef(null);

  useOutsideClick(modalRef, onClose);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            <Backdrop>
              <motion.div
                ref={modalRef}
                key="modal"
                role="dialog"
                className="shadow-modal fixed bottom-0 z-[999] flex max-w-[500px] w-full flex-col items-center gap-4 rounded-t-3xl bg-gray02 py-6"
                variants={modalVariants}
                initial={isRecommendationModal ? 'recommendationHidden' : 'hidden'}
                animate={isRecommendationModal ? 'recommendationVisible' : 'visible'}
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </motion.div>
            </Backdrop>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default CommentModal;
