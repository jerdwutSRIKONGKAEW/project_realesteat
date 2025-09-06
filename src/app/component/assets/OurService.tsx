"use client";
import Cards from '../Cards';
import { useRouter } from 'next/navigation';

const OurService = () => {
    const router = useRouter()
    const OurServiceData = {
        OurServiceText: [
            {
                title: "บทความอสังหาริมทรัพย์",
                description: "ทำเลที่ใช่ คือกำไรชีวิต ความสะดวกสบาย ความปลอดภัย",
                path:"/article",
                img: "/image/service_article.jpg"
            },
            {
                title: "ฝากขาย",
                description: "การประชาสัมพันธ์ ทรัพย์สินของท่านสู่กลุ่มเป้าหมาย ผ่านสื่อต่างฯที่หลากหลาย",
                path:"/contact",
                img: "/image/service_consignment.jpg"
            },
        ]
    };

    const handleClickPage = (typecode: string) => {
        router.push(`${typecode}`);
    };

    const OurServiceList = () => {
        return <div className="grid grid-cols-2 gap-4">
            {
                OurServiceData.OurServiceText.map((item, index) => (
                    <Cards src={item.img} title={item.title} key={index} href={item.path}>
                        <div className='grid gap-2'>
                            <div>
                                {item.description}
                            </div>
                        </div>
                    </Cards>
                ))
            }
        </div>

    }

    return (
        <div>
            <div className="home-title">
                บริการของเรา
            </div>
            <OurServiceList />
        </div>
    )
}

export default OurService;