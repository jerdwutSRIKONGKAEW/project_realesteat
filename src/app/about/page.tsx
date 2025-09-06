"use client";
import React from 'react';
import { FetchAbout } from '../component/ServiceProvider';
import { useEffect, useState } from "react";
import AdviceAsset from '../component/assets/AdviceAsset';
import ContactModal from '../modal/contact';

const About = () => {
  type AboutItem = {
    id: number;
    about_text: string;
  };
  
  const [aboutListData, setaboutListData] = useState<AboutItem[]>([]);
  const [loadingData, setloadingData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='main-container'>
      <div className='page-title'>เกี่ยวกับเรา</div>
      
      {loadingData ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">กำลังโหลด...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {aboutListData.map((item, index) => (
            <div key={item.id || index} className="text-gray-700 leading-relaxed">
              {item.about_text}
            </div>
          ))}
        </div>
      )}
      
      <AdviceAsset />
      
     
    </div>
  );
};

export default About;