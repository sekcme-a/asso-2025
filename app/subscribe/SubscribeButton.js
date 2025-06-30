"use client";

import Script from "next/script";
import { useState } from "react";

export default function SubscribeButton({ user }) {
  const [text, setText] = useState("");
  const handleSubscribe = () => {
    setText("");
    if (!user) return alert("로그인 후 이용해주세요");
    const IMP = window.IMP;
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_CODE);

    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: `subscr_${Date.now()}`,
        name: "월간 구독 서비스",
        customer_uid: `cust_${user.id}`,
        amount: 0, // 빌링키 발급만
        buyer_email: user.email,
        buyer_name: user.name,
        m_redirect_url: "localhost:3000",
      },
      async (rsp) => {
        if (rsp.success) {
          const res = await fetch("/api/subscribe", {
            method: "POST",
            body: JSON.stringify({
              userId: user.id,
              email: user.email,
              name: user.name,
              customer_uid: rsp.customer_uid,
            }),
          });
          const data = await res.json();
          if (data.success) alert("구독 완료");
          else alert("결제 실패: " + data.message);
        } else {
          // alert("결제가 실패했거나 취소됨");
          console.log(rsp.error_msg);
          setText(rsp.error_msg);
        }
      }
    );
  };

  return (
    <>
      {" "}
      <Script src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js" />
      <button onClick={handleSubscribe}>월 9,900원 구독하기</button>
      <p>{text}</p>
    </>
  );
}
