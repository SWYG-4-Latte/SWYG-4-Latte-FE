'use client'
//Component
import HeaderSection from "@/components/auth/signup/HeaderSection";
import TitleSection from "@/components/auth/signup/TitleSection";
import ContentsSection from "@/components/auth/signup/ContentsSection";
import FooterSection from "@/components/auth/signup/FooterSection";

export default function SignupContainer() {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen flex flex-col relative">
        <HeaderSection />
        {/* line 들어갈 공간 2px*/}
        <TitleSection />
        <ContentsSection />
        <FooterSection />
      </div>
    </div>
  )
}
