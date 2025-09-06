"use client";
import AdviceAsset from "@/app/component/assets/AdviceAsset";
import { useEffect, useState, use } from "react";
import { FetchNewsDetail } from '../../component/ServiceProvider';
import ContactModal from '../../modal/contact';

interface ArticleDetailPageProps {
    searchParams: Promise<{ id?: string }>
}

const ArticleDetail = ({ searchParams }: ArticleDetailPageProps) => {

    const resolvedSearchParams = use(searchParams);
    const NewsId = resolvedSearchParams.id;

    type NewsItem = {
        news_no: number;
        news_title: string;
        news_detail: string;
        news_image: string;
    };

    const [assetListData, setAssetListData] = useState<NewsItem[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        if (NewsId) {
            fetchNewsDetail();
        }
    }, [NewsId]);

    const fetchNewsDetail = async () => {
        try {
            setLoadingData(true);
            await new Promise(resolve => setTimeout(resolve, 400));

            // ใช้ productId ที่ได้จาก searchParams แทนที่จะใช้ค่าคงที่ 1001
            const res = await FetchNewsDetail(Number(NewsId) || 1001);
            console.log("API response:", res);

            if (res && res.news) {
                setAssetListData(res.news);
            } else {
                console.log("ดึงข้อมูลไม่สำเร็จ หรือโครงสร้างข้อมูลไม่ถูกต้อง");
            }
        } catch (e) {
            console.error("error", e);
        } finally {
            setLoadingData(false);
        }
    };

    const ArticleDetailList = () => {
        return assetListData.length > 0 ?
            assetListData.map((item, index) => {
                return (
                    <div key={item.news_no}>
                        <img src={`data:image/png;base64,${item.news_image}`}
                            alt="Banner"
                            className="img-detail" />
                        <div className="page-topic py-2">
                            {item.news_title}
                        </div>
                        <div>
                            {item.news_detail}
                        </div>
                    </div>
                );
            }) : null
    }

    return (
        <div className='main-container'>
            <div>
                {ArticleDetailList()}
            </div>
            <div className="pt-3">
                <AdviceAsset />
            </div>
        </div>
    );
}

export default ArticleDetail;