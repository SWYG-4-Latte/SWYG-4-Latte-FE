//NEXT
import Image from "next/image"
//Zustand
import useSignupStore from "@/store/signupStore"

export default function ProgressbarSection() {
  const { currentStep } = useSignupStore()

  const renderedProgressbarSection = () => {
    switch(currentStep) {
      case 1:
        return(
          <section className="w-full h-[2px]">
            <Image
              src='/svgs/svg_progressbar01.svg'
              alt="progressbar01"
              width={360}
              height={2}
            />
          </section>
        )
      case 2:
        return(
          <section className="w-full h-[2px]">
            <Image
              src='/svgs/svg_progressbar02.svg'
              alt="progressbar01"
              width={360}
              height={2}
            />
          </section>
        )
      case 3:
        return(
          <section className="w-full h-[2px]">
            <Image
              src='/svgs/svg_progressbar03.svg'
              alt="progressbar01"
              width={360}
              height={2}
            />
          </section>
        )
      case 4:
        return(
          <section className="w-full h-[2px]">
            <Image
              src='/svgs/svg_progressbar04.svg'
              alt="progressbar01"
              width={360}
              height={2}
            />
          </section>
        )
      case 5:
        return(
          <section>
            
          </section>
        )
    }
  }

  return (
    <div className="max-w-[360px]">
      {renderedProgressbarSection()}
    </div>
  )
}
