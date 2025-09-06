"use client";
import storage from '../../utility/storage';
import { useRouter } from 'next/navigation';

const HomeBanner = () => {
    const router = useRouter()

    const handleClickPage = (typecode: string) => {
        router.push(`${typecode}`);
    };

    const BannerList = () => {
        return <div className="justify-center flex relative">
            <img src="/image/banner.jpg" alt="Banner" className="max-h-180 w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className='grid gap-2'>
                    <div className='justify-center flex'>
                        <img src="/image/favicon.png" className='max-h-25 max-w-25 bg-white border rounded-xl' />
                    </div>
                    <div className="text-white text-5xl font-bold">
                        {storage.en_name}
                    </div>
                    <div className="text-white text-3xl font-bold text-center">
                        {storage.th_name}
                    </div>
                    <div className='justify-center flex'>
                        <button type="button" onClick={() => handleClickPage("/estate")}
                            className="bg-white text-blue-800 hover:bg-blue-800 hover:text-white rounded-lg text-2xl p-4 cursor-pointer">
                            ค้นหาทรัพย์ที่คุณต้องการ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <BannerList />
        </div>
    )
}

export default HomeBanner;