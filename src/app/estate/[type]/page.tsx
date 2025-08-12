"use client";
import { useEffect, useState } from "react";
import Cards from '../../component/Cards';
import { FetchAsset } from '../../component/ServiceProvider';
import { useRouter } from 'next/navigation';
import { use } from "react";

interface EstateTypePageProps {
    params: Promise<{ type: string, id?: string }>
}

const EstateTypePage = ({ params }: EstateTypePageProps) => {
    const router = useRouter()
    const { type } = use(params); // รับ type จาก URL parameter
    const resolvedSearchParams = use(params);
    const productId = resolvedSearchParams.id;
    
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
    const [selectData, setSelectData] = useState(type); // ใช้ type จาก URL เป็นค่าเริ่มต้น

    // แปลง type code เป็นชื่อภาษาไทย
    const getTypeName = (typeCode: string) => {
        const typeMap: { [key: string]: string } = {
            'CD': 'คอนโด',
            'SH': 'บ้านเดี่ยว',
            'SD': 'บ้านแฝด',
            'CB': 'อาคารพานิชย์',
            'TH': 'ทาวน์เฮ้าส์'
        };
        return typeMap[typeCode] || typeCode;
    };

    useEffect(() => {
        setSelectData(type); // อัพเดท selectData ตาม URL
        fetchAsset();
    }, [type]);

    const fetchAsset = async () => {
        try {
            setloadingData(true);
            await new Promise(resolve => setTimeout(resolve, 400));
            const res = await FetchAsset(type); // ใช้ type จาก URL parameter
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

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectData(value)
        
        // Navigate ไปยังหน้าใหม่ตาม type ที่เลือก
        if (value === "ALL") {
            router.push('/estate') // กลับไปหน้าหลัก
        } else {
            router.push(`/estate/${value}`) // ไปหน้าย่อยตาม type
        }
    };

     const selectSearch = () => {
        return (
            <form className="max-w mx-auto pb-3">
                <div className="flex">
                    <select
                        value={selectData}
                        onChange={handleSelectChange}
                        id="countries"
                        className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium  text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    >
                        <option value="ALL">ทั้งหมด</option>
                        <option value="CD">คอนโด</option>
                        <option value="SH">บ้านเดี่ยว</option>
                        <option value="SD">บ้านแฝด</option>
                        <option value="CB">อาคารพานิชย์</option>
                        <option value="TH">ทาวน์เฮ้าส์</option>
                    </select>


                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search..." required />
                        <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    const selectList = () => {
        return (
            <div className="max-w-40 py-2">
                <select
                    value={selectData}
                    onChange={handleSelectChange}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="ALL">ทั้งหมด</option>
                    <option value="CD">คอนโด</option>
                    <option value="SH">บ้านเดี่ยว</option>
                    <option value="SD">บ้านแฝด</option>
                    <option value="CB">อาคารพานิชย์</option>
                    <option value="TH">ทาวน์เฮ้าส์</option>
                </select>
            </div>
        );
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
            <div className="grid-asset-card">
                {
                    assetListData.length > 0 ?
                        assetListData.map((item, index) => (
                            <Cards key={index} src='/image/imageTest.jpg' href={`/estate/detail?id=${item.asset_no}`}>
                                <div className="grid gap-1">
                                    <div className="card-title">{item.asset_name}</div>
                                    <div>{item.asset_text}</div>
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
                                        <div>{item.asset_address}</div>
                                    </div>
                                </div>
                            </Cards>
                        )) : null
                }
            </div>
        )
    }

    return (
        <div className='main-container'>
            <div className="page-title">อสังหาริมทรัพย์ ประเภท{getTypeName(type)}</div>
            <div className="pt-2">
                {selectSearch()}
            </div>
            <div>
                {dataList()}
            </div>
        </div>
    );
};

export default EstateTypePage;