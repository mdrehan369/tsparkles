import React from "react";

export type PaymentMethod = "razorpay" | "phonepe" | "upi" | "cod";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const paymentOptions: {
  id: PaymentMethod;
  label: string;
  description: string;
  embed: React.ReactNode;
}[] = [
  {
    id: "razorpay",
    label: "Razorpay",
    description: "Pay using Cards, UPI, Net Banking",
    embed: (
      <a href="https://razorpay.com/" target="_blank">
        {" "}
        <img
          referrerPolicy="origin"
          src="https://badges.razorpay.com/badge-light.png "
          style={{ height: "45px", width: "113px" }}
          alt="Razorpay | Payment Gateway | Neobank"
        />
      </a>
    ),
  },
  {
    id: "phonepe",
    label: "PhonePe",
    description: "Pay using PhonePe wallet or UPI",
    embed: (
      <a href="https://phonepe.com/" target="_blank">
        {" "}
        <img
          referrerPolicy="origin"
          src="https://cdn.brandfetch.io/idcE0OdG8i/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"
          style={{ height: "45px", width: "113px" }}
          alt="PhonePe | Payment Gateway | Neobank"
        />
      </a>
    ),
  },
];

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      {paymentOptions.map((option) => (
        <div
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`border-2 border-amber-300 w-full rounded-xl p-4 cursor-pointer transition flex gap-6`}
          style={{
            borderColor: value === option.id ? "#7A4DE8" : "yellow",
            backgroundColor: value === option.id ? "#F3E8FF" : "transparent",
          }}
        >
          {option.embed}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{option.label}</p>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
