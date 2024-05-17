//NEXT,React
import Link from 'next/link';
import Image from 'next/image';

export default function ArticleHeader() {
  return (
    <header className="flex min-h-[56px] max-w-[500px] items-center justify-between bg-primaryIvory px-5 py-4">
      <h2 className="text-[18px] font-semibold text-gray10">아티클</h2>
      <Link href="/article/search">
        <Image src="/svgs/search.svg" alt="search" width={24} height={24} priority unoptimized />
      </Link>
    </header>
  );
}
