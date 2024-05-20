//NEXT, React
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useCallback, useState } from "react"
//Library && Hook
import useArticleStore from "@/store/articleStore"
import { useIntersect } from "@/hooks/useIntersect"
//Component
import ArticleCard from "./ArticleCard"


interface IArticle {
  articleNo: number;
  imageUrl: string | null;
  images: { imgUrl1: string; imgUrl2: string } | null;
  title: string;
  subTitle: string;
  content: string;
  writerNo: number;
  nickname: string;
  viewCnt: number;
  likeCnt: number;
  deleteYn: string;
  regDate: string;
  updateDate: string | null;
}


export default function Article() {
    const { articles, fetchArticles, hasMore, setSort} = useArticleStore()
    const [activeSort, setActiveSort] = useState('recent')
    const [articleHero, setArticleHero] = useState<IArticle | null>(null)
    
    useEffect(()=>{
      fetchArticles(true)
    },[])

    console.log(articles)

    useEffect(() => {
      const articleHero = articles.find(article => article.articleNo === 1)
      if (articleHero) {
        setArticleHero(articleHero)
      }
    }, [articles])

    const onIntersect = useCallback(()=>{
      if(hasMore) {
        console.log('Intersected and fetching more articles...');
        fetchArticles()
      }
    },[hasMore, fetchArticles])

    const observeTargetRef = useIntersect(onIntersect)

    const handleClickSort = (sortType: string) => {
      setActiveSort(sortType)
      setSort(sortType)
    }


  return (
    <>
      <section className="px-5 min-h-[255px] text-gray10">
        <Image
          src={"/svgs/svg_article-hero.svg"}
          alt="article-hero"
          width={360}
          height={175}
          priority
          className="rounded-lg w-full"
        />
        <div className="flex flex-col mt-3 mb-4">
          <h1 className="font-medium">{articleHero ? articleHero.title : '라떼 핏을 소개합니다!'}</h1>
          <p className="mt-2 text-[12px] text-gray06 space-x-2.5">
            <span>조회수 <strong>{articleHero ? articleHero.viewCnt : 0}</strong></span>
            <span className="w-[1px] h-2 border-l borde-gray06 mx-2.5"/>
            <span>추천해요 <strong>{articleHero ? articleHero.likeCnt : 0}</strong></span>
          </p>
        </div>
      </section>
      <div className="px-5 w-full h-2 bg-gray03" />
      {/* 무한스크롤 */}
      <section className="px-5 min-h-[375px] text-gray10">
      {/* Filter Btns */}
      <div className="mt-4 flex itmes-center space-x-2">
        <button 
          onClick={() => handleClickSort('recent')} 
          className={`w-[63px] h-[30px] px-4 py-2 flex-all-center text-[12px] border rounded-md whitespace-nowrap
              ${activeSort === 'recent' ? 'text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
        >
          최신순
        </button>
        <button 
          onClick={() => handleClickSort('viewCnt')} 
          className={`w-[63px] h-[30px] px-4 py-2 flex-all-center text-[12px] border rounded-md whitespace-nowrap
          ${activeSort === 'viewCnt' ? ' text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
        >
          조회순
        </button>
        <button 
          onClick={() => handleClickSort('likeCnt')} 
          className={`w-[63px] h-[30px] px-4 py-2 flex-all-center text-[12px] border rounded-md whitespace-nowrap
          ${activeSort === 'likeCnt' ? ' text-primaryOrange border-primaryOrange' : 'border-gray05'}`}
          >
            추천순
          </button>
      </div>
        {/* ITEMS - Data Fetching  */}
        <div className="w-full mt-4 mb-20">
          {articles.map((article, index) => (
              <ArticleCard 
                  key={article.articleNo}
                  ref={index === articles.length - 1 ? observeTargetRef : null}
                  article={article}
              />
          ))}
        </div>
      </section>
    </>
  )
}
