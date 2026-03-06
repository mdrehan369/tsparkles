import crypto from "crypto";
import { NextRequest } from "next/server";

export const getPaginationQuery = (req: NextRequest) => {
  const page = Number(req.nextUrl.searchParams.get("page")) || 1;
  const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;

  return { page, limit };
};

export const asyncHandler = async (fn: any) => {
  try {
    return await fn();
  } catch (error) {
    console.log(error);
  }
};

export const generateOtp = () => {
  const otp = crypto.randomInt(1000, 10000);
  return otp.toString();
};

export const generateHash = (data: string) => {
  const hash = crypto.hash("sha256", data);
  return hash.toString();
};

export const verifyHash = (data: string, hash: string) => {
  const dataHash = crypto.hash("sha256", data);
  return hash == dataHash;
};

export const normalize = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

export const buildComparableAddress = (data: {
  fullName: string;
  phoneNumber: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}) => ({
  fullName: normalize(data.fullName),
  phoneNumber: normalize(data.phoneNumber),
  line1: normalize(data.line1),
  city: normalize(data.city),
  state: normalize(data.state),
  postalCode: normalize(data.postalCode),
  country: normalize(data.country),
});

export const isSameAddress = (
  a: ReturnType<typeof buildComparableAddress>,
  b: ReturnType<typeof buildComparableAddress>,
) => {
  return (
    a.fullName === b.fullName &&
    a.phoneNumber === b.phoneNumber &&
    a.line1 === b.line1 &&
    a.city === b.city &&
    a.state === b.state &&
    a.postalCode === b.postalCode &&
    a.country === b.country
  );
};

export function generateRandomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}
