"use client";

import * as React from "react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

export function OtpInput({ length = 4, onComplete }: OtpInputProps) {
  const [otp, setOtp] = React.useState<string[]>(new Array(length).fill(""));

  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move focus forward
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const joined = newOtp.join("");
    if (joined.length === length && !newOtp.includes("")) {
      onComplete?.(joined);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = digit;
      }
    });

    onComplete?.(newOtp.join(""));
  };

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="
            w-14 h-14
            text-center text-xl font-semibold
            rounded-xl
            border border-gray-300
            focus:border-black
            focus:outline-none
            transition
          "
        />
      ))}
    </div>
  );
}
