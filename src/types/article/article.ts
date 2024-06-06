export interface IArticle {
  articleNo: number;
  viewCnt: number;
  likeCnt: number;
  title: string;
  subTitle: string;
  imageUrl: string;
  regDate: string;
  updateDate: string;
  content: string;
  writerNo: string;
  deleteYn: string;
  images: ArticleImages;
}

interface ArticleImages {
  imgUrl1: string; // thumbnail
  imgUrl2: string;
  imgUrl3?: string;
  imgUrl4?: string;
}
