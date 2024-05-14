import { useRouter, usePathname } from "next/navigation"

import ArticlesDetailPage from "@/app/article/detail/[id]/page"


export default function Article() {
  const pathname = usePathname()

  return (
    <>
      <section className="px-5 h-[300px] bg-rose-100"></section>
      <div className="px-5 w-full h-2 mt-6 bg-gray03" />
      <section className="px-5 h-[300px] bg-rose-100"></section>
    </>
  )
}
