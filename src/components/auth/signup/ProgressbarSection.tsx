import { motion } from 'framer-motion';

//Zustand
import useSignupStore from '@/store/signupStore';

export default function ProgressbarSection() {
  const { currentStep } = useSignupStore();

  if (currentStep === 5) return null;

  return (
    <div className="absolute left-0 top-14 h-[2px] w-full bg-gray03">
      <motion.div
        initial={{ width: `calc(${currentStep}/4*100%)` }}
        animate={{ width: `calc(${currentStep}/4*100%)` }}
        className={`h-[2px] bg-primaryAmber`}
      ></motion.div>
    </div>
  );
}
