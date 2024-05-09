//NEXT
import Image from "next/image"
import Link from "next/link"
//Constants
import { subInfos }  from '@/constants/mypage/subInfos'


export default function MypageSubInfo() {

  const renderedSubInfos = subInfos.map((info, index) => {

    return(
      <Link href={info.link}>
        <aside 
          key={index} 
          className={
            `px-5 py-2 w-[360px] h-[66px] ${index === subInfos.length - 1 ? "" : 'border-b boder-gray04'}`
          }
        >
          <div className="flex items-center justify-between w-full h-[50px]">
            <p>{info.name}</p>
            
              <Image 
                src="/svgs/svg_rightArrow.svg"
                alt="rightArrow"
                width={16}
                height={16}
                priority
                unoptimized
              />
          </div>
        </aside>
        </Link>
      )
    })


  return (
    <section className="">
      {renderedSubInfos}
    </section>
  )
}
