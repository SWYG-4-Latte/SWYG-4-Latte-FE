import MypageHeader from "@/components/mypage/MypageHeader"
import MypageUserInfo from "@/components/mypage/MypageUserInfo"
import MypageSubInfo from "@/components/mypage/MypageSubInfo"

export default function MypageContainer() {
  return (
    <div className="w-full h-screen flex flex-col items-center text-gray10">
      <MypageHeader />
      <MypageUserInfo/>
      <MypageSubInfo />
    </div>
  )
}
