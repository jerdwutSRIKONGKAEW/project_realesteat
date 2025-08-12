"use client";
import Cards from '../Cards';
import { FetchAsset } from '../ServiceProvider';
import { useEffect, useState } from "react";

const AdviceAsset = () => {

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
    const [loadingData, setloadingData] = useState(true);

    useEffect(() => {
        fetchAsset();
    }, []);

    const fetchAsset = async () => {
        try {
            setloadingData(true);

            const res = await FetchAsset("ALL");
            console.log("API response:", res);

            if (res && res.asset) {
                setAssetListData(res.asset);
            } else {
                console.log("ดึงข้อมูลไม่สำเร็จ หรือโครงสร้างข้อมูลไม่ถูกต้อง");
            }
        } catch (e) {
            console.error("error", e);
        } finally {
            setloadingData(false);
        }
    };

    const shuffleArray = (array: AssetItem[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const AdviceList = () => {
        return <div>
            <div className="home-title">
                ทรัพย์แนะนำ
            </div>
            <div className="grid-asset-card">
                {
                    assetListData.length > 0 ?
                        shuffleArray(assetListData).slice(0, 3).map((item, index) => (
                            <Cards key={index} src='/image/imageTest.jpg' href={`/estate/detail?id=${item.asset_no}`}>
                                <div className="grid gap-1">
                                    <div className="card-title">{item.asset_name}</div>
                                    <div className='truncate'>{item.asset_text}</div>
                                    <div className="flex">
                                        <div className="card-room">
                                            <img className="asset-room" src='/image/bed.svg' />
                                            <div className="pl-1 pr-1">ห้องนอน {item.asset_room_bed}</div>
                                            <img className="asset-room" src='/image/bath.svg' />
                                            <div className="pl-1 pr-1">ห้องน้ำ {item.asset_room_bath}</div>
                                        </div>
                                    </div>
                                    <div className='flex'>

                                        <img className="asset-room" src='/image/location.svg' />
                                        <div className='truncate'>{item.asset_address}</div>
                                    </div>
                                </div>
                            </Cards>
                        )) : null
                }
            </div>
        </div>
    }

    return (
        <div>
            <AdviceList />
        </div>
    )
}

export default AdviceAsset;