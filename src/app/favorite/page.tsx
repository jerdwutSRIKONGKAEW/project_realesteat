"use client";
import { useEffect, useState } from "react";
import { FetchAsset } from '../component/ServiceProvider';
import Cards from '../component/Cards';

const Favorite = () => {
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

    useEffect(() => {
        fetchAsset();
    }, []);

    // ฟังก์ชันสำหรับจัดการ cookies
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

    // ฟังก์ชันสำหรับดึง favorite asset_no จาก cookies
    const getFavoriteAssetIds = (): number[] => {
        const favoriteCookie = getCookie('favorite_assets');
        if (favoriteCookie) {
            try {
                return JSON.parse(favoriteCookie);
            } catch (e) {
                console.error('Error parsing favorites from cookies:', e);
            }
        }
        return [];
    };

    // ฟังก์ชันลบรายการโปรดรายการเดียว
    const deleteFavorite = (assetNo: number) => {
        const favoriteAssets = getFavoriteAssetIds();
        const updatedFavorites = favoriteAssets.filter(id => id !== assetNo);
        
        // อัปเดต cookie
        setCookie('favorite_assets', JSON.stringify(updatedFavorites));
        
        // อัปเดต state
        const updatedAssetList = assetListData.filter(asset => asset.asset_no !== assetNo);
        setAssetListData(updatedAssetList);
        
        // ถ้าหน้าปัจจุบันไม่มีข้อมูลแล้ว ให้กลับไปหน้าก่อนหน้า
        const itemsPerPage = 9;
        const totalPages = Math.ceil(updatedAssetList.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    };

    // ฟังก์ชันลบรายการโปรดทั้งหมด
    const deleteAllFavorites = () => {
        // ลบ cookie
        setCookie('favorite_assets', JSON.stringify([]));
        
        // ลบข้อมูลทั้งหมด
        setAssetListData([]);
        setCurrentPage(1);
    };

    const fetchAsset = async () => {
        try {
            setloadingData(true);
            const res = await FetchAsset("ALL");
            console.log("API response:", res);
            
            if (res && res.asset) {
                // ดึง favorite asset_no จาก cookies
                const favoriteIds = getFavoriteAssetIds();
                console.log("Favorite IDs from cookies:", favoriteIds);
                
                // กรองเฉพาะ asset ที่มี asset_no อยู่ใน favorites
                const favoriteAssets = res.asset.filter((asset: AssetItem) => 
                    favoriteIds.includes(asset.asset_no)
                );
                
                console.log("Filtered favorite assets:", favoriteAssets);
                setAssetListData(favoriteAssets);
            } else {
                console.log("ดึงข้อมูลไม่สำเร็จ หรือโครงสร้างข้อมูลไม่ถูกต้อง");
            }
        } catch (e) {
            console.error("error", e);
        } finally {
            setloadingData(false);
        }
    };

    const itemsPerPage = 9;
    const totalPages = Math.ceil(assetListData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = assetListData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
        );
    };

    const DeleteButton = ({ assetNo }: { assetNo: number }) => {
        const handleDelete = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            deleteFavorite(assetNo);
        };

        return (
            <button 
                type="button" 
                className="border rounded-sm px-2 py-1 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white transition-colors duration-200" 
                onClick={handleDelete}
                title="ลบจากรายการโปรด"
            >
                ×
            </button>
        );
    };

    const FavoriteList = () => {
        if (currentItems.length === 0) {
            return <div className="text-center py-8">ไม่มีรายการโปรด</div>;
        }

        return (
            <div className="grid-estate-card">
                {currentItems.map((item, index) => (
                    <Cards 
                        key={item.asset_no} 
                        favoriteButton={<DeleteButton assetNo={item.asset_no} />} 
                        title={item.asset_name} 
                        src={`data:image/png;base64,${item.asset_img}`} 
                        href={`/estate/detail?id=${item.asset_no}`}
                    >
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
                ))}
            </div>
        );
    };

    const handleDeleteAll = () => {
        if (window.confirm('คุณต้องการลบรายการโปรดทั้งหมดหรือไม่?')) {
            deleteAllFavorites();
        }
    };

    return (
        <div className='main-container'>
            <div className="page-title flex justify-between items-center">
                <span>รายการโปรด ({assetListData.length} รายการ)</span>
                <div className="flex gap-2">
                    {assetListData.length > 0 && (
                        <button
                            onClick={handleDeleteAll}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
                        >
                            ลบทั้งหมด
                        </button>
                    )}
                </div>
            </div>
            <div>
                <FavoriteList />
                <Pagination />
            </div>
        </div>
    );
};

export default Favorite;