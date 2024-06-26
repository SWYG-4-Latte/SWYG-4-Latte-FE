// SSR
import ArticleDetail from '@/components/article/ArticleDetail';
import CommentList from '@/components/article/CommentList';
import CommentForm from '@/components/article/CommentForm';

interface ArticleDetailPageProps {
  params: { id: string };
}

async function getData(id: string) {
  try {
    const res = await fetch(`https://latte-server.site/article/detail/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const article = await getData(params.id);

  if (!article) {
    return <div>Failed to load article.</div>;
  }

  return (
    <div>
      <ArticleDetail article={article} />
      <section className="mt-8 pb-14">
        <CommentList articleNo={article.articleNo} />
        <div className="h-2 w-full bg-gray03" />
      </section>

      <CommentForm articleNo={article.articleNo} />
    </div>
  );
}
