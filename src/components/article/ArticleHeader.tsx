//NEXT,React
import Link from "next/link"
import Image from "next/image"



export default function ArticleHeader() {
  return (
    <header className="px-5 py-4 flex items-center justify-between min-h-[56px] max-w-[500px]">
        <h2 className="text-gray10 text-[18px] font-bold">아티클</h2>
        <Image
          src="/svgs/search.svg"
          alt="search"
          width={24}
          height={24}
          priority
          unoptimized
          />
    </header>
  )
}
