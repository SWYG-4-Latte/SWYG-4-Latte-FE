'use client';
//Component
import HeaderSection from '@/components/auth/signup/HeaderSection';
import ProgressbarSection from '@/components/auth/signup/ProgressbarSection';
import TitleSection from '@/components/auth/signup/TitleSection';
import ContentsSection from '@/components/auth/signup/ContentsSection';
import FooterSection from '@/components/auth/signup/FooterSection';

export default function SignupContainer() {
  return (
    <div className="w-full text-gray10">
      <div className="relative flex w-full flex-col items-center pb-24">
        <HeaderSection />
        <TitleSection />
        <ContentsSection />
        <FooterSection />
      </div>
    </div>
  );
}
