export interface Article {
  articleNo: number;
  viewCnt: number;
  likeCnt: number;
  title: string;
  imageUrl: string;
  regDate: string;
  content: string;
  images: ArticleImages;
}

interface ArticleImages {
  imgUrl1: string; // thumbnail
  imgUrl2: string;
  imgUrl3?: string;
  imgUrl4?: string;
}