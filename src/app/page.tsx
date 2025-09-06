
import PopularAsset from './component/assets/PopularAsset';
import AdviceAsset from './component/assets/AdviceAsset';
import OurService from './component/assets/OurService';
import ArticleAsset from './component/assets/ArticleAsset';
import HomeBanner from './component/assets/HomeBanner';

export default function Home() {
  return (
    <div className="main-container">
      <div className='grid gap-10'>
        <HomeBanner />
        <PopularAsset />
        <ArticleAsset />
        <AdviceAsset />
        <OurService />
      </div>
    </div>
  );
}
