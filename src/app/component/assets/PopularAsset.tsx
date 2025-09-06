"use client";
import Cards from '../Cards';
import { useEffect, useState } from "react";
import { FetchAbout } from '../ServiceProvider';
import { useRouter } from 'next/navigation';

const PopularAsset = () => {
    const router = useRouter()
    type AboutItem = {
        about_text: string;
    };
    const [aboutListData, setaboutListData] = useState<AboutItem[]>([]);
    const [loadingData, setloadingData] = useState(true);
    const PopularData = {
        assetType: [
            {
                type: "บ้านเดี่ยว",
                description: "พื้นที่กว้างขวาง ให้ทุกความสุขของครอบครัวเริ่มต้นที่นี่…บ้านเดี่ยวคุณภาพ",
                typecode: "SH",
                img: "/image/advice_singlehouse.jpg"
            },
            {
                type: "คอนโด",
                description: "ชีวิตเมืองที่ลงตัว ใกล้ที่ทำงาน ห้างสรรพสินค้า และแหล่งไลฟ์สไตล์",
                typecode: "CD",
                img: "/image/advice_condo.jpg"
            },
            {
                type: "อาคารพานิชย์",
                description: "ลงทุนคุ้ม ทำเลทอง อาคารพานิชย์ที่พร้อมเป็นทั้งบ้านและธุรกิจในที่เดียว",
                typecode: "CB",
                img: "/image/advice_commercial.jpg"
            }
        ]
    };

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            setloadingData(true);

            const res = await FetchAbout();
            console.log("API response:", res);

            if (res && res.about) {
                setaboutListData(res.about);
            } else {
                console.log("ดึงข้อมูลไม่สำเร็จ หรือโครงสร้างข้อมูลไม่ถูกต้อง");
            }
        } catch (e) {
            console.error("error", e);
        } finally {
            setloadingData(false);
        }
    };

    const handleClickPage = (typecode: string) => {
        router.push(`/estate/${typecode}`);
    };

    const PopularList = () => {
        return (
            <div className='grid-estate-card'>
                {
                    PopularData.assetType.map((item, index) => (

                        <Cards src={item.img} key={index} title={item.type} href={`/estate/${item.typecode}`}>
                            <div className='grid gap-2'>
                                <div>
                                    {item.description}
                                </div>
                            </div>
                        </Cards>

                    ))
                }

            </div>
        );
    };

    return (
        <div>
            <div className="home-title">ประเภททรัพย์ยอดนิยม</div>
            <div>
                {PopularList()}
            </div>
        </div>
    );
};

export default PopularAsset;
