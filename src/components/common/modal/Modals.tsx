'use client';

import { useModalStore } from '@/store/modalStore';
import LoginModal from './LoginModal';
import DrinkRecordModal from './DrinkRecordModal';
import DeleteComparisonBoxModal from './DeleteComparisonBoxModal';
import DrinkRecommendationModal from './DrinkRecommendationModal';

const Modals = () => {
  const openedModal = useModalStore((state) => state.openedModal);
  const getModalData = useModalStore((state) => state.getModalData);

  switch (openedModal) {
    case 'login':
      return <LoginModal />;

    case 'record':
      const drinkData = getModalData('record');
      if (drinkData) {
        return <DrinkRecordModal {...drinkData} />;
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
