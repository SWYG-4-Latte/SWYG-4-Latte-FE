import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-8 px-5">
      <Image src="/svgs/not-found.svg" alt="not found icon" width={48} height={48} />
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-semibold text-gray10">찾으시는 페이지가 없습니다</p>
        <p className="text-sm leading-5 text-gray08">
          요청하신 페이지를 찾을 수 없습니다.
          <br /> 입력하신 페이지의 주소를 확인해주세요.
        </p>
      </div>
      <Link
        href="/home"
        className="rounded-lg border border-gray05 bg-primaryIvory px-4 py-3 font-semibold leading-[25px] text-gray08"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
