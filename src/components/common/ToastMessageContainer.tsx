'use client';

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessageContainer = () => {
  return (
    <ToastContainer
      hideProgressBar
      newestOnTop
      autoClose={300}
      closeButton={false}
      position="bottom-center"
      className="bottom-[92px] flex flex-col items-center justify-center"
      toastClassName="mb-0 shadow-toast flex min-h-[30px] h-[30px] w-fit items-center justify-center rounded-[20px] bg-[#242221B2]/[.70] px-6 py-2 text-xs text-gray00"
      bodyClassName="h-[14px] whitespace-nowrap"
      transition={Zoom}
    />
  );
};

export default ToastMessageContainer;
