"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FetchMenu } from './ServiceProvider';

const Footer = () => {

    type MenuItem = {
        id_menu: number;
        menu_name: string;
        menu_path: string;
    };

    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [menuListData, setMenuListData] = useState<MenuItem[]>([]);
    const [loadingData, setloadingData] = useState(true);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            setloadingData(true);

            const res = await FetchMenu();
            console.log("API response:", res);

            if (res && res.menu) {
                setMenuListData(res.menu);
            } else {
                console.log("ดึงข้อมูลไม่สำเร็จ หรือโครงสร้างข้อมูลไม่ถูกต้อง");
            }
        } catch (e) {
            console.error("error", e);
        } finally {
            setloadingData(false);
        }
    };


    return <div className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src="/image/favicon.png" className="h-16" alt="BaanYooYen" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BaanYooYen</span>
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    {
                        menuListData.map((item, index) => (
                            <li key={item.id_menu}>
                                <a href={item.menu_path} className="hover:underline me-4 md:me-6">{item.menu_name}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
        </div>
    </div>
}

export default Footer;
