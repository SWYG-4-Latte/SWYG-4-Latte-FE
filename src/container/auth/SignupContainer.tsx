'use client'
//Component
import HeaderSection from "@/components/auth/signup/HeaderSection";
import ProgressbarSection from "@/components/auth/signup/ProgressbarSection";
import TitleSection from "@/components/auth/signup/TitleSection";
import ContentsSection from "@/components/auth/signup/ContentsSection";
import FooterSection from "@/components/auth/signup/FooterSection";

export default function SignupContainer() {
  return (
    <div className="w-full h-screen text-gray10">
      <div className="w-full h-screen flex flex-col relative">
        <HeaderSection />
        <ProgressbarSection/>
        <TitleSection />
        <ContentsSection />
        <FooterSection />
      </div>
    </div>
  )
}
