import { toast } from 'react-toastify';

import Button from '../button/Button';
import Modal, { ModalProps } from './Modal';

const DeleteComparisonBoxModal = ({ isOpen, onClose }: ModalProps) => {
  const handleClearComparisonBox = () => {
    // 비교함 로직 구현 후 추가하기
    onClose();
    toast('삭제되었습니다');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-lg font-semibold text-primaryOrange">비교함이 가득 찼어요</div>

      <p className="text-center text-sm leading-[20px] text-gray10">담겨 있는 음료를 전체 삭제할까요?</p>
      <div className="flex gap-2">
        <button
          className="h-[50px] w-32 rounded-lg border border-gray05 bg-primaryIvory px-4 py-3 font-semibold leading-[25px] text-gray08 hover:border-0 hover:bg-gray06 hover:text-gray00"
          onClick={onClose}
        >
          그만두기
        </button>
        <Button className="w-32 rounded-lg px-4 py-3 font-semibold leading-[25px]" onClick={handleClearComparisonBox}>
          삭제하기
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteComparisonBoxModal;
