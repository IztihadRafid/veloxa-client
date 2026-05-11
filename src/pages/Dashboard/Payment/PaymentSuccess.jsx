import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searhParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState();
  const hasCalled = useRef(false);
  const sessionId = searhParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);

  useEffect(() => {
    if (!sessionId) return;
    if (hasCalled.current) return;
    hasCalled.current = true;

    console.log(sessionId); // ✅ runs only once

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`, { sessionId })
      .then((res) => {
        console.log(res.data); // ✅ runs only once
        setPaymentInfo({
          transactionId: res.data.transactionId,
          trackingId: res.data.trackingId,
        });
      });
  }, [sessionId]);
console.log("ingfoasdasd",paymentInfo)
  return (
    <div>
      <h1>PAYMENT SUCCESSFUL</h1>
      <p>Your TransactionID: {paymentInfo?.transactionId}</p>
      <p>Your TrackingID: {paymentInfo?.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
