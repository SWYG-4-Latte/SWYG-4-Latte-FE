'use client';

import { PropsWithChildren, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

const Modal = ({ isOpen, onClose, children, isRecommendationModal = false }: PropsWithChildren<ModalProps>) => {
  const modalRef = useRef(null);

  useOutsideClick(modalRef, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop>
          <motion.div
            ref={modalRef}
            key="modal"
            role="dialog"
            className="fixed z-[999] flex w-[304px] flex-col items-center gap-4 rounded-2xl bg-gray02 px-5 py-6 shadow-modal"
            variants={modalVariants}
            initial={isRecommendationModal ? 'recommendationHidden' : 'hidden'}
            animate={isRecommendationModal ? 'recommendationVisible' : 'visible'}
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Modal;
