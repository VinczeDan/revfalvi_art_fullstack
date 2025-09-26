// src/pages/NewsDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/TranslationContext";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string;
  publication_date: string;
}

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/news/${id}/?lang=${language}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: NewsItem = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [id, language]);

  if (loading) return <p>{t("news.loading")}</p>;
  if (error)
    return (
      <p className="text-red-500">
        {t("news.error")}: {error}
      </p>
    );
  if (!news) return <p>{t("news.noNews")}</p>;

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link to="/" className="text-blue-500 underline mb-6 block">
          ← {t("news.back")}
        </Link>
        <Card className="overflow-hidden shadow-soft">
          {news.image_url && (
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-64 object-cover"
            />
          )}
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
            <p className="text-sm text-gray-500 mb-6">
              {new Date(news.publication_date).toLocaleDateString()}
            </p>
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {news.content}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsDetail;
