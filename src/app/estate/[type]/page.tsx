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
        asset_img: string;
    };

    const [assetListData, setAssetListData] = useState<AssetItem[]>([]);
    const [filteredData, setFilteredData] = useState<AssetItem[]>([]);
    const [loadingData, setloadingData] = useState(true);
    const [selectData, setSelectData] = useState(type);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [favoriteAssets, setFavoriteAssets] = useState<number[]>([]);

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
        loadFavoritesFromCookie();
    }, [type]);

    useEffect(() => {
        handleSearch();
    }, [assetListData, searchQuery]);

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

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setFilteredData(assetListData);
        } else {
            const filtered = assetListData.filter(item =>
                item.asset_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.asset_address.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        }
        setCurrentPage(1); // รีเซ็ตไปหน้าแรกเมื่อค้นหา
    };

        const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // การค้นหาจะทำงานอัตโนมัติผ่าน useEffect
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
            <form className="max-w mx-auto pb-3" onSubmit={handleSearchSubmit}>
                <div className="flex">
                    <select
                        value={selectData}
                        onChange={handleSelectChange}
                        id="countries"
                        className="search-select"
                    >
                        <option value="ALL">ทั้งหมด</option>
                        <option value="CD">คอนโด</option>
                        <option value="SH">บ้านเดี่ยว</option>
                        <option value="SD">บ้านแฝด</option>
                        <option value="CB">อาคารพานิชย์</option>
                        <option value="TH">ทาวน์เฮ้าส์</option>
                    </select>


                    <div className="relative w-full">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="search-bar"
                            placeholder="ค้นหาจากชื่ออสังหาหรือที่อยู่..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                </div>
            </form>
        )
    }

    const itemsPerPage = 9;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // เลือนไปบนสุดของ page
    };

    const TotalPage = () => {
        return <div>
            {filteredData.length > 0 && (
                <div className="text-center mt-4 text-gray-600">
                    รายการที่ {startIndex + 1} - {Math.min(endIndex, filteredData.length)} จาก ({filteredData.length} รายการ)
                    {searchQuery && (
                        <div className="text-sm text-blue-800 mt-1">
                            ผลการค้นหา: "{searchQuery}"
                        </div>
                    )}
                </div>
            )}
            {filteredData.length === 0 && !loadingData && searchQuery && (
                <div className="text-center mt-4 text-gray-600">
                    <div className="text-lg">ไม่พบข้อมูลที่ค้นหา</div>
                    <div className="text-sm text-blue-800 mt-1">
                        คำค้นหา: "{searchQuery}"
                    </div>
                </div>
            )}
        </div>
    }

     const getCookie = (name: string): string | null => {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    };

    const setCookie = (name: string, value: string) => {
        if (typeof document === 'undefined') return;
        const expires = new Date();
        expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const loadFavoritesFromCookie = () => {
        const favoriteCookie = getCookie('favorite_assets');
        if (favoriteCookie) {
            try {
                const favorites = JSON.parse(favoriteCookie);
                setFavoriteAssets(favorites);
            } catch (e) {
                console.error('Error parsing favorite assets cookie:', e);
                setFavoriteAssets([]);
            }
        }
    };

    const saveFavoritesToCookie = (favorites: number[]) => {
        setCookie('favorite_assets', JSON.stringify(favorites));
    };

    const toggleFavorite = (assetNo: number) => {
        let updatedFavorites;
        if (favoriteAssets.includes(assetNo)) {
            // ลบออกจากรายการโปรด
            updatedFavorites = favoriteAssets.filter(id => id !== assetNo);
        } else {
            // เพิ่มในรายการโปรด
            updatedFavorites = [...favoriteAssets, assetNo];
        }
        setFavoriteAssets(updatedFavorites);
        saveFavoritesToCookie(updatedFavorites);
    };

     const FavoriteButton = ({ assetNo }: { assetNo: number }) => {
        const isFavorite = favoriteAssets.includes(assetNo);
        
        return (
            <button 
                type="button" 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(assetNo);
                }}
                className={`border rounded-sm p-2 transition-colors ${
                    isFavorite 
                        ? 'border-pink-500 bg-pink-500 text-white hover:bg-pink-600' 
                        : 'border-pink-200 hover:bg-pink-200 hover:text-pink-400 text-pink-400'
                }`}
            >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                </svg>
            </button>
        );
    };

    const Pagination = () => {

        if (totalPages <= 1) return null;

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        return (
            <div>
                <div className="flex justify-center items-center mt-8 gap-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-md ${currentPage === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-800 text-white hover:bg-blue-800'
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
                                ? 'bg-blue-800 text-white'
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
                            : 'bg-blue-800 text-white hover:bg-blue-800'
                            }`}
                    >
                        →
                    </button>
                </div>
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
            <div className="grid-estate-card">
                {
                    currentItems.length > 0 ?
                        currentItems.map((item, index) => (
                            <Cards key={index} title={item.asset_name} favoriteButton={<FavoriteButton assetNo={item.asset_no}/>} src={`data:image/png;base64,${item.asset_img}`} href={`/estate/detail?id=${item.asset_no}`}>
                                <div className="grid gap-1">
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
                {TotalPage()}
                {Pagination()}
            </div>
        </div>
    );
};

export default EstateTypePage;