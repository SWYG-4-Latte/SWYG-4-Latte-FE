'use client';

import { useCallback, useEffect } from 'react';

import { ModalData, ModalType, useModalStore } from '@/store/modalStore';

const useModal = (modalType: ModalType) => {
  const isOpen = useModalStore((state) => state.isOpen(modalType));
  const modalOpen = useModalStore((state) => state.setModalOpen);
  const modalClose = useModalStore((state) => state.setModalClose);

  const closeModal = () => {
    modalClose(modalType);
  };

  const openModal = useCallback(
    (data?: ModalData[typeof modalType]) => {
      modalOpen(modalType, data);
    },
    [modalType, modalOpen],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  return { isOpen, closeModal, openModal };
};

export default useModal;
