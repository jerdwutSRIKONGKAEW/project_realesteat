"use client";
import { FetchPrinciples } from '../ServiceProvider';
import { useEffect, useState } from "react";
import React from 'react';

const ArticleAsset = () => {
    type PrinciplesItem = {
        id: number;
        about_principles: string;
        about_principles_details: string;
        about_house: string;
        about_house_details: string;
        about_condo: string;
        about_condo_details: string;
        about_img1: string;
        about_img2: string;
        about_img3: string;
    };

    const [principlesListData, setPrinciplesListData] = useState<PrinciplesItem[]>([]);
    const [loadingData, setloadingData] = useState(true);

    useEffect(() => {
        fetchPrinciples();
    }, []);

    const fetchPrinciples = async () => {
        try {
            setloadingData(true);

            const res = await FetchPrinciples();
            console.log("API response:", res);

            if (res && res.about) {
                setPrinciplesListData(res.about);
            } else {
                console.log("ดึงข้อมูลไม่สำเร็จ หรือโครงสร้างข้อมูลไม่ถูกต้อง");
            }
        } catch (e) {
            console.error("error", e);
        } finally {
            setloadingData(false);
        }
    };

    const ArticleList = () => {
        return (
            <div className="article-main-grid">
                {
                    principlesListData.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className='grid gap-3'>
                                <div>
                                    <div className="page-topic">{item.about_principles}</div>
                                    <div>{item.about_principles_details}</div>
                                </div>
                                <hr className="my-4 border-black" />
                                <div className='grid grid-cols-5'>
                                    <div className='article-back'>
                                        <img src='/icons/home.svg' className='w-12 h-12' />
                                    </div>
                                    <div className='col-span-4'>
                                        <div className="page-topic">
                                            {item.about_house}
                                        </div>
                                        <div>
                                            {item.about_house_details}
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-5'>
                                    <div className='article-back'>
                                        <img src='/icons/condo.svg' className='w-12 h-12' />
                                    </div>
                                    <div className='col-span-4'>
                                        <div className="page-topic">
                                            {item.about_condo}
                                        </div>
                                        <div>
                                            {item.about_condo_details}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='grid gap-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <img src={`data:image/png;base64,${item.about_img1}`}
                                        alt="assetimage"
                                        className='article-img'
                                    />
                                    <img src={`data:image/png;base64,${item.about_img2}`}
                                        alt="assetimage"
                                        className='article-img'
                                    />
                                </div>
                                <div>
                                    <img src={`data:image/png;base64,${item.about_img3}`}
                                        alt="assetimage"
                                        className='article-img'
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        );
    };


    return (
        <div>
            <ArticleList />
        </div>
    )
}

export default ArticleAsset;