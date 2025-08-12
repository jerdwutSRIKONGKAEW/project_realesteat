"use client";
import React from 'react';
import AdviceAsset from '../component/assets/AdviceAsset';
import { FetchContact } from '../component/ServiceProvider';
import { useEffect, useState } from "react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    type ContactItem = {
        id: number;
        tel: string;
        facebook: string;
        line: string;
        mail: string;
        location: string;
        company: string;
        img_company: string;
    };
    const [contactListData, setContactListData] = useState<ContactItem[]>([]);
    const [loadingData, setloadingData] = useState(true);

    useEffect(() => {
        fetchContact();
    }, []);

    const fetchContact = async () => {
        try {
            setloadingData(true);

            const res = await FetchContact();
            console.log("API response:", res);

            if (res && res.contact) {
                setContactListData(res.contact);
            } else {
                console.log("ดึงข้อมูลไม่สำเร็จ หรือโครงสร้างข้อมูลไม่ถูกต้อง");
            }
        } catch (e) {
            console.error("error", e);
        } finally {
            setloadingData(false);
        }
    };

    // Handle click outside modal to close
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle ESC key press
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
            onClick={handleBackdropClick}
        >
            <div className="relative p-4 w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            ติดต่อเรา
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
                            onClick={onClose}
                            aria-label="ปิด Modal"
                        >
                            <h3>X</h3>
                        </button>
                    </div>
                    {/* Content */}
                    <div className="p-4 md:p-5 space-y-4">
                        {contactListData.length > 0 ? (
                            contactListData.map((item, index) => (
                                <div key={item.id || index} className="text-gray-700 dark:text-gray-300">
                                    {item.tel && (
                                        <div className="mb-1 flex items-center">
                                            <img src='/icons/tel.svg' className='h-8' />
                                            <div className='pl-2 font-semibold'>
                                                {item.tel}
                                            </div>
                                        </div>
                                    )}
                                    {item.facebook && (
                                        <div className="mb-1 flex items-center">
                                            <img src='/icons/facebook.svg' className='h-8' />
                                            <div className='pl-2 font-semibold'>
                                                {item.facebook}
                                            </div>
                                        </div>
                                    )}
                                    {item.line && (
                                        <div className="mb-1 flex items-center">
                                            <img src='/icons/line.svg' className='h-8' />
                                            <div className='pl-2 font-semibold'>
                                                {item.line}
                                            </div>
                                        </div>
                                    )}
                                    {item.mail && (
                                        <div className="mb-1 flex items-center">
                                            <img src='/icons/email.svg' className='h-8' />
                                            <div className='pl-2 font-semibold'>
                                                {item.mail}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : null
                        }
                    </div>
                    <div className="flex items-center p-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <div>
                            <button
                                type="button"
                                className="button"
                                onClick={onClose}
                            >
                                ปิด
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;