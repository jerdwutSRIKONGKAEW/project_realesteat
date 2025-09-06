"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FetchMenu } from './ServiceProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NavMenu = () => {
    const router = useRouter()
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

    const handleClickPage = (typecode: string) => {
        router.push(`${typecode}`);
    };


    /*const menuItems = [
        { href: '/', label: 'หน้าแรก' },
        { href: '/estate', label: 'อสังหาริมทรัพย์' },
        { href: '/article', label: 'บทความ' },
        { href: '/about', label: 'เกี่ยวกับ' },
        { href: '/contact', label: 'ติดต่อเรา' }
    ];*/

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/image/favicon.png" className="h-12" alt="Flowbite Logo" />
                    <div>
                        <div className='text-base font-semibold'>BaanYooYen</div>
                        <div className='text-sm'>บ้านอยู่เย็น</div>
                    </div>
                </Link>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" onClick={() => handleClickPage("/favorite")} className="bg-blue-800 text-white font-medium rounded-lg text-base px-3 py-1.5 cursor-pointer">
                        รายการโปรด
                    </button>
                    <button
                        onClick={toggleMobileMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {menuListData.map((item) => (
                            <li key={item.id_menu}>
                                <Link
                                    href={item.menu_path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block py-2 px-3 rounded-sm transition-colors duration-200 ${isActive(item.menu_path)
                                        ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                                        : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        } md:p-0`}
                                    aria-current={isActive(item.menu_path) ? "page" : undefined}
                                >
                                    {item.menu_name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavMenu;