"use client";
import AdviceAsset from '../component/assets/AdviceAsset';
import { FetchContact } from '../component/ServiceProvider';
import { useEffect, useState } from "react";
const Contact = () => {
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

  const ContactList = () => {
    return (
      <div>
        {
          contactListData.length > 0 ?
            contactListData.map((item, index) => (
              <div key={item.id} className='grid grid-cols-3 gap-4'>
                <div>
                  <img src='/icons/tel.svg' className='h-75' />
                </div>
                <div className='col-span-2 ...'>
                  <iframe
                    src={item.location}
                    width="100%"
                    height="300px"
                    frameBorder="0"
                    style={{ border: "0px" }}

                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div>
                  <div className="page-topic pb-2">
                    ช่องทางติดต่อ
                  </div>
                  <div className='flex'>
                    <img src='/icons/tel.svg' className='img-contact' />
                    <div>{item.tel}</div>
                  </div>
                  <div className='flex'>
                    <img src='/icons/facebook.svg' className='img-contact' />
                    <div>{item.facebook}</div>
                  </div>
                  <div className='flex'>
                    <img src='/icons/line.svg' className='img-contact' />
                    <div>{item.line}</div>
                  </div>
                  <div className='flex'>
                    <img src='/icons/email.svg' className='img-contact' />
                    <div>{item.mail}</div>
                  </div>
                </div>
                <div className='col-span-2 ...'>
                  <div className="page-topic pb-2">
                    บริษัท
                  </div>
                  <div>{item.company}</div>
                </div>
              </div>
            )) : null
        }
      </div>
    );
  };

  return (
    <div className='main-container'>
      <div className='page-title'>ติดต่อเรา</div>
      <div>
        {ContactList()}
        <AdviceAsset />
      </div>
    </div>
  );
};

export default Contact;