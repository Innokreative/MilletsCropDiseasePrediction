import { Leaf, Megaphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface NewsArticle {
  title: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
  description: string;
  image: string;
}

const SustainableFarmingTips = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = '6d91d75274359fa9dcf3f4bb019d7c9f';
        const query = encodeURIComponent('agriculture scheme OR farming subsidy OR crop insurance');
        
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=${query}&lang=en&country=in&max=10&apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setNews(data.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-3 px-5">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Leaf className="h-5 w-5 mr-2" />
          Agricultural News & Schemes
        </h3>
      </div>
      
      <div className="p-5">
        {/* News Carousel Section */}
        <div className="pt-4">
          <div className="flex items-center mb-4">
            <Megaphone className="h-5 w-5 mr-2 text-green-600" />
            <h4 className="text-lg font-semibold">Latest Updates for Farmers</h4>
          </div>

          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-3 rounded-lg text-red-700 text-sm">
              {error} - Please try again later
            </div>
          ) : (
            <Slider {...carouselSettings}>
              {news.map((article, index) => (
                <div key={index} className="px-2">
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="h-48 bg-gray-100 relative">
                      {article.image ? (
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                          <span className="text-gray-500">No Image Available</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 bg-gradient-to-b from-white to-blue-50">
                      <h5 className="font-semibold text-gray-800 group-hover:text-blue-600 mb-2 line-clamp-2">
                        {article.title}
                      </h5>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {article.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                          {article.source.name}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default SustainableFarmingTips;