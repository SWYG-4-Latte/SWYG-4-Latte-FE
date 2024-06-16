import Image from 'next/image';
import Link from 'next/link';

import LoginIcon from '/public/svgs/icon-login-modal.svg';

const FindIdResultContainer = ({ id }: { id: string }) => {
  return (
    <div className="h-full">
      <section className="mt-[80px] flex flex-col items-center justify-center gap-8">
        <Image src={LoginIcon} alt="아이디 찾기 성공 아이콘" />
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray10">아이디 찾기가 완료되었습니다.</h1>
          <p className="mt-4 text-gray08">입력하신 정보와 일치하는 아이디입니다.</p>
        </div>
        <div className="w-full rounded-lg border border-gray05 bg-gray00 px-5 py-4 text-center text-gray10">{id}</div>
      </section>
      <section className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex h-[96px] w-full max-w-[500px] items-center justify-center gap-2 px-5 font-semibold">
        <Link
          href="/auth/find/password"
          className="flex h-[50px] w-1/2 items-center justify-center rounded-lg border border-gray05 bg-gray01 px-5 py-4 text-gray08 hover:bg-gray06 hover:text-gray00"
        >
          비밀번호 찾기
        </Link>
        <Link
          href="/auth/login"
          className="flex h-[50px] w-1/2 items-center justify-center rounded-lg bg-primaryOrange px-5 py-4 text-gray00 hover:bg-primaryAmber"
        >
          로그인
        </Link>
      </section>
    </div>
  );
};

export default FindIdResultContainer;
