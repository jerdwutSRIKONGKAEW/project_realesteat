"use client";
import AdviceAsset from "@/app/component/assets/AdviceAsset";
import { useEffect, useState, use } from "react";
import { FetchAssetDetail } from '../../component/ServiceProvider';
import ContactModal from '../../modal/contact';

interface EstateDetailPageProps {
    searchParams: Promise<{ id?: string }>
}

const EstateDetail = ({ searchParams }: EstateDetailPageProps) => {
    const resolvedSearchParams = use(searchParams);
    const assetId = resolvedSearchParams.id;

    type AssetItem = {
        asset_no: number;
        asset_name: string;
        asset_type: string;
        asset_address: string;
        asset_sale_price: string;
        asset_rent_price: string;
        asset_room_bed: string;
        asset_room_bath: string;
        asset_area: string;
        asset_contact: string;
        asset_text: string;
    };

    const [assetListData, setAssetListData] = useState<AssetItem[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (assetId) {
            fetchAssetDetail();
        }
    }, [assetId]);

    const fetchAssetDetail = async () => {
        try {
            setLoadingData(true);
            await new Promise(resolve => setTimeout(resolve, 400));

            // ใช้ productId ที่ได้จาก searchParams แทนที่จะใช้ค่าคงที่ 1001
            const res = await FetchAssetDetail(Number(assetId) || 1001);
            console.log("API response:", res);

            if (res && res.asset) {
                setAssetListData(res.asset);
            } else {
                console.log("ดึงข้อมูลไม่สำเร็จ หรือโครงสร้างข้อมูลไม่ถูกต้อง");
            }
        } catch (e) {
            console.error("error", e);
        } finally {
            setLoadingData(false);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const formatNumber = (num: string | number): string => {
        if (!num) return '0';

        const cleanNum = num.toString().replace(/,/g, '');

        if (isNaN(Number(cleanNum))) return num.toString();

        return Number(cleanNum).toLocaleString('en-US');
    };

    const dataList = () => {
        if (loadingData) {
            return (
                <div className="text-center p-20">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-25 h-25 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        return (
            assetListData.length > 0 ?
                assetListData.map((item, index) => {
                    return (
                        <div key={index}>
                            <img src="/image/imageTest.jpg" alt="Banner" className="w-full" />
                            <div className='grid grid-cols-2 gap-4 p-3'>
                                <div className="grid gap-4">
                                    <div className="page-topic">
                                        {item.asset_name}
                                    </div>
                                    <div>รหัสทรัพย์: {item.asset_type}-{item.asset_no}</div>
                                    <div className="flex items-center">
                                        <img className="asset-room-detail" src='/image/location.svg' alt="location" />
                                        <div>{item.asset_address}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="card-room flex items-center">
                                            <img className="asset-room-detail" src='/image/bed.svg' alt="bed" />
                                            <div className="pl-1 pr-1">ห้องนอน {item.asset_room_bed}</div>
                                            <img className="asset-room-detail" src='/image/bath.svg' alt="bath" />
                                            <div className="pl-1 pr-1">ห้องน้ำ {item.asset_room_bath}</div>
                                        </div>
                                    </div>
                                    <div>ราคาขาย: {formatNumber(item.asset_sale_price)} บาท</div>
                                    <div>ราคาเช่า: {formatNumber(item.asset_rent_price)} บาท</div>
                                    <div>พื้นที่ใช้สอย: {item.asset_area} ตารางเมตร</div>
                                </div>
                                <div>
                                    <div className="page-topic">
                                        ข้อมูลเพิ่มเติม
                                    </div>
                                    <div className="mt-4">
                                        {item.asset_text}
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={handleOpenModal}
                                            className="button-contact"
                                        >
                                            สอบถามรายละเอียด
                                        </button>

                                        {/* Modal Component */}
                                        <ContactModal
                                            isOpen={isModalOpen}
                                            onClose={handleCloseModal}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) :
                <div className="text-center p-10">
                    <p>ไม่พบข้อมูลทรัพย์สิน</p>
                </div>
        );
    }

    // ถ้าไม่มี productId แสดง error
    if (!assetId) {
        return (
            <div className='main-container'>
                <div className="page-title pb-2">อสังหาริมทรัพย์</div>
                <div className="text-center p-10">
                    <p>ไม่พบรหัสทรัพย์สิน</p>
                </div>
            </div>
        );
    }

    return (
        <div className='main-container'>
            <div className="page-title pb-2">อสังหาริมทรัพย์</div>
            <div>
                {dataList()}
            </div>
            <AdviceAsset />
        </div>
    );
};

export default EstateDetail;