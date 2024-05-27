import { create } from 'zustand';

import { DrinkRecordModalProps } from '@/components/common/modal/DrinkRecordModal';

export type ModalType = 'login' | 'record' | 'deleteComparisonDrinks' | 'recommendation' | 'exit' | 'exitConfirm';

// 모달에 전달할 추가 props 데이터, 현재는 기록하기 모달에만 필요
export interface ModalData {
  login: null;
  record: DrinkRecordModalProps | null;
  deleteComparisonDrinks: null;
  recommendation: null;
  exitConfirm: null;
  exit: null;
}

interface ModalState {
  openedModal: ModalType | null;
  modalData: ModalData;
}

interface ModalActions {
  isOpen: (type: ModalType) => boolean;
  setModalOpen: <T extends ModalType>(type: T, data?: ModalData[T]) => void;
  setModalClose: (type: ModalType) => void;
  getModalData: <T extends ModalType>(type: T) => ModalData[T] | null;
}

export const useModalStore = create<ModalState & ModalActions>((set, get) => ({
  openedModal: null,
  modalData: {
    login: null,
    record: null,
    deleteComparisonDrinks: null,
    recommendation: null,
    exitConfirm: null,
    exit: null,
  },
  isOpen: (type) => get().openedModal === type,
  setModalOpen: (type, data) =>
    set((state) => ({
      openedModal: type,
      modalData: { ...state.modalData, [type]: data || null },
    })),
  setModalClose: (type) =>
    set((state) => ({
      openedModal: null,
      modalData: { ...state.modalData, [type]: null },
    })),
  getModalData: (type) => get().modalData[type],
}));
