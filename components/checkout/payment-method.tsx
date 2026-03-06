import React, { useState } from "react";
import {
  PaymentMethodSelector,
  PaymentMethod,
} from "./payment-method-selector";

export default function Payment() {
  const [method, setMethod] = useState<PaymentMethod>("razorpay");

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

      <PaymentMethodSelector value={method} onChange={setMethod} />
    </div>
  );
}
