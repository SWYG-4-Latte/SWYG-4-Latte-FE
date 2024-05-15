import Image from 'next/image';

const ArticleRecommendationContainer = () => {
  const recommendationArticle = {
    articleNo: 1,
    imageUrl: 'https://cdn.pixabay.com/photo/2021/07/13/18/58/coffee-6464307_1280.jpg',
    title: '카페인, 커피, 그리고 건강: 진실은 무엇일까?',
    viewCnt: 10,
    likeCnt: 3,
  };

  return (
    <div className="px-5 pt-4">
      <h1 className="pt-4 font-semibold text-gray10">이런 아티클은 어때요?</h1>
      <div className="flex flex-col gap-3 py-4">
        <Image
          priority
          src={recommendationArticle.imageUrl}
          alt={recommendationArticle.title}
          width={0}
          height={0}
          sizes="100vw"
          className="h-40 w-full rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <span className="line-clamp-1 font-medium text-gray10">{recommendationArticle.title}</span>
          <div className="flex items-center text-sm text-gray08">
            <span>조회수</span>
            <span className="ml-[10px]">{recommendationArticle.viewCnt}</span>
            <div className="mx-[10px] h-3 w-px bg-gray06" />
            <span>추천해요</span>
            <span className="ml-[10px]">{recommendationArticle.likeCnt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleRecommendationContainer;
