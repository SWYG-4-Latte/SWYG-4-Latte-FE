import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

import { Article } from '@/types/article/article';

const ArticleListItem = ({ article }: { article: Article }) => {
  const { images, title, viewCnt, likeCnt, regDate, articleNo } = article;

  const router = useRouter();

  return (
    <li
      onClick={() => router.push(`/article/${articleNo}`)}
      className="flex min-h-24 cursor-pointer items-center gap-4 border-b border-gray04 bg-gray02 px-4 py-4 last:border-none"
    >
      <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={images.imgUrl1}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-full"
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="line-clamp-1 font-medium text-gray10">{title}</div>
        <div className="flex items-center gap-[10px] text-sm text-gray06">
          <span>{dayjs(regDate).format('YYYY.MM.DD')}</span>
          <div className="flex gap-1">
            <span>조회수</span>
            <span className="text-gray08">{viewCnt}</span>
          </div>
          <div className="flex gap-1">
            <span>추천해요</span>
            <span className="text-gray08">{likeCnt}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ArticleListItem;
