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
        asset_img: string;
    };

    const [assetListData, setAssetListData] = useState<AssetItem[]>([]);
    const [loadingData, setloadingData] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [favoriteAssets, setFavoriteAssets] = useState<number[]>([]);

    useEffect(() => {
        fetchAsset();
        loadFavoritesFromCookie();
    }, []);

    const fetchAsset = async () => {
        try {
            setloadingData(true);

            const res = await FetchAsset("ALL");
            console.log("API response:", res);

            if (res && res.asset) {
                // สร้างข้อมูลเพียงพอสำหรับ 3 หน้า (9 รายการ)
                const shuffledData = shuffleArray(res.asset);
                const limitedData = shuffledData.slice(0, 9); // จำกัดเพียง 9 รายการ
                setAssetListData(limitedData);
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

    // ฟังก์ชันคุกกี้
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

    //pagination *การเปลี่ยนหน้า
    const itemsPerPage = 3;
    const totalPages = Math.ceil(assetListData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = assetListData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const Pagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        return (
            <div className="flex justify-center items-center pt-3 gap-2">
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
            </div>
        );
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

    const AdviceList = () => {

        return (
            <div>
                <div className="home-title">
                    ทรัพย์แนะนำ
                </div>
                <div className="grid-estate-card">
                    {currentItems.length > 0 ?
                        currentItems.map((item, index) => (
                            <Cards key={item.asset_no} favoriteButton={<FavoriteButton assetNo={item.asset_no} />} title={item.asset_name} src={`data:image/png;base64,${item.asset_img}`} href={`/estate/detail?id=${item.asset_no}`}>
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
                        )) : (
                            <div className="col-span-full text-center py-8">
                                <div>ไม่พบข้อมูลทรัพย์</div>
                            </div>
                        )
                    }
                </div>

                <Pagination />
            </div>
        );
    };

    return (
        <div>
            <AdviceList />
        </div>
    );
};

export default AdviceAsset;