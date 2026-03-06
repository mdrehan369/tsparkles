"use server";

import { EMAIL_SUBJECTS, OTP_EXPIRY_TIME, STATUS_CODES } from "@/constants";
import { prisma } from "@/lib/prisma";
import { generateAccessToken, verifyAccessToken } from "@/utils/jwt";
import { sendEmail } from "@/utils/nodemailer";
import { sendOtpTemplate } from "@/utils/templates";
import { generateHash, generateOtp, verifyHash } from "@/utils/utilityMethods";
import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // maxAge: 60 * 60 * 24, // 1 day
  });
}

export const sendOtp = async (to: string) => {
  try {
    const otp = generateOtp();
    await sendEmail(to, EMAIL_SUBJECTS.SEND_OTP, sendOtpTemplate(otp));
    await prisma.verification.create({
      data: {
        otp: generateHash(otp),
        email: to,
      },
    });
    return {
      code: STATUS_CODES.SUCCESS,
      error: null,
      data: null,
    };
  } catch (err: any) {
    console.log(err);
    return {
      code: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: err,
      data: null,
    };
  }
};

export const verifyOtpAndLogin = async (email: string, otp: string) => {
  try {
    const verification = await prisma.verification.findFirst({
      where: { email, verified: false },
    });

    if (!verification)
      return {
        code: STATUS_CODES.NOT_FOUND,
        error: "No verification found",
        data: null,
      };

    if (
      new Date().getTime() - new Date(verification.createdAt).getTime() >
      OTP_EXPIRY_TIME
    )
      return {
        code: STATUS_CODES.BAD_REQUEST,
        error: "Otp expired",
        data: null,
      };

    // TODO: Add Retry Checks
    const isOtpCorrect = verifyHash(otp, verification.otp);
    if (!isOtpCorrect)
      return {
        code: STATUS_CODES.BAD_REQUEST,
        error: "Invalid OTP",
        data: null,
      };

    await prisma.verification.update({
      where: { id: verification.id },
      data: { verified: true },
    });

    // create account
    let account: any = await prisma.account.findFirst({
      where: {
        email,
      },
      include: {
        cart: {
          include: {
            CartItem: true,
          },
        },
      },
    });

    if (!account) {
      account = await prisma.account.create({
        data: {
          email,
          isVerified: true,
          cart: {
            create: {},
          },
        },
        include: {
          cart: {
            include: {
              CartItem: true,
            },
          },
        },
      });
    }

    const token = await generateAccessToken({
      id: account.id,
      email,
    });

    await setAuthCookie(token);
    return {
      code: STATUS_CODES.SUCCESS,
      error: null,
      data: account,
    };
  } catch (err: any) {
    console.log(err);
    return {
      code: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: err,
      data: null,
    };
  }
};

export const getCurrUser = async () => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;
    if (!token)
      return {
        code: STATUS_CODES.NOT_AUTHENTICATED,
        error: "User not authenticated",
        data: null,
      };

    const decodedToken = await verifyAccessToken(token);
    const account = await prisma.account.findUnique({
      where: { id: decodedToken.id },
      include: {
        cart: {
          include: {
            CartItem: true,
          },
        },
      },
    });

    if (!account)
      return {
        code: STATUS_CODES.NOT_FOUND,
        error: "Account not found",
        data: null,
      };

    return {
      code: STATUS_CODES.SUCCESS,
      error: null,
      data: account,
    };
  } catch (err) {
    console.log(err);
    return {
      code: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: err,
      data: null,
    };
  }
};
