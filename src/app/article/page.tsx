"use client";
import React from 'react';
import AdviceAsset from '../component/assets/AdviceAsset';
import { FetchNews } from '../component/ServiceProvider';
import { useEffect, useState } from "react";

const Article = () => {

  type NewsItem = {
    news_no: number;
    news_title: string;
    news_detail: string;
    news_image: string;
  };

  const [newsListData, setNewsListData] = useState<NewsItem[]>([]);
  const [loadingData, setloadingData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setloadingData(true);
      const res = await FetchNews();
      console.log("API response:", res);
      if (res && res.news) {
        setNewsListData(res.news);
      } else {
        console.log("ดึงข้อมูลไม่สำเร็จ หรือโครงสร้างข้อมูลไม่ถูกต้อง");
      }
    } catch (e) {
      console.error("error", e);
    } finally {
      setloadingData(false);
    }
  };

  const handleReadMore = (newsId: number) => {
    window.location.href = `/article/detail?id=${newsId}`;
  };

  const itemsPerPage = 6;
  const totalPages = Math.ceil(newsListData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = newsListData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // เลือนไปบนสุดของ page
  };

  const TotalPage = () => {
    return <div>
      {newsListData.length > 0 && (
        <div className="text-center mt-4 text-gray-600">
          รายการที่ {startIndex + 1} - {Math.min(endIndex, newsListData.length)} จาก ({newsListData.length} รายการ)
        </div>
      )}
    </div>
  }

  const Pagination = () => {

    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center mt-8 gap-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md ${currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          ←
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-md ${currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md ${currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          →
        </button>
      </div>
    );
  };

  const ArticleList = () => {
    return <div className='grid-article-card'>
      {
        currentItems.map((item, index) => (
          <div className="p-5 max-w bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" key={item.news_no}>
            <a>
              <div className='flex items-center'>
                <div className='max-w-[50%] h-50 items-center flex'>
                  <img src={`data:image/png;base64,${item.news_image}`} className='h-100  object-contain pt-3'/>
                </div>
                <div className="pl-5">
                  <div className="card-title">
                    {item.news_title}
                  </div>
                  <button
                    type="button"
                    className="button"
                    onClick={() => handleReadMore(item.news_no)}
                  >
                    อ่านเพิ่มเติม
                  </button>
                </div>
              </div>
            </a>
          </div>
        ))
      }
    </div>
  }

  return (
    <div className='main-container'>
      <div className='page-title'>บทความ</div>
      <div>
        {ArticleList()}
        {TotalPage()}
        {Pagination()}
      </div>
      <div className='pt-3'><AdviceAsset /></div>
    </div>
  );
};

export default Article;