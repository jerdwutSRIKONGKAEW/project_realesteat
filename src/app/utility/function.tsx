import getConfig from "next/config";


const headers = {
  "Content-Type": "application/json",
};

export const handleError = function CatchErrorHandle(error: any) {
 if (error === 400) {
    return "ส่งค่าไปไม่ครบตามที่กำหนด";
  } else if (error === 401) {
    return "ไม่มีสิทธิ์ในการเข้าถึง กรุณาเข้าสู่ระบบใหม่";
  } else if (error === 403) {
    return "ท่านไม่มีสิทธิ์ใช้งานเมนูนี้";
  } else if (error === 404) {
    return "ไม่พบข้อมูลที่ต้องการ";
  } else if (error === 500) {
    return "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
  } else if (error >= 500) {
    return "เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่อีกครั้ง";
  } else {
    return "เกิดเหตุผิดพลาด กรุณาติดต่อผู้พัฒนา";
  }
};

export const RequestFunction = async function RequestService(url: string,) {
  return fetch(url, {
    method:  "GET",
    headers: {
      "Content-Type": "application/json",
    },
    
  })
    .then((res) => {
      console.log(url, res);
      return res.json();
    })
    .catch((error) => {
      if (!!error.response) {
        throw handleError(error.response.status);
      } else {
        console.log(error);
        throw handleError("etc");
      }
    });
};