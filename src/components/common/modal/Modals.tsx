'use client';

import { useModalStore } from '@/store/modalStore';
import LoginModal from './LoginModal';
import RecordCompleteModal from './RecordCompleteModal';
import DeleteComparisonBoxModal from './DeleteComparisonBoxModal';
import DrinkRecommendationModal from './DrinkRecommendationModal';

const Modals = () => {
  const openedModal = useModalStore((state) => state.openedModal);
  const getModalData = useModalStore((state) => state.getModalData);

  switch (openedModal) {
    case 'login':
      return <LoginModal />;

    case 'recordComplete':
      const recordCompleteData = getModalData('recordComplete');
      if (recordCompleteData) {
        return <RecordCompleteModal {...recordCompleteData} />;
      }

    case 'deleteComparisonDrinks':
      return <DeleteComparisonBoxModal />;

    case 'recommendation':
      return <DrinkRecommendationModal />;

    default:
      return null;
  }
};

export default Modals;
