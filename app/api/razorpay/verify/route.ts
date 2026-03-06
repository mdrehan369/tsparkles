import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { EMAIL_SUBJECTS, STATUS_CODES } from "@/constants";
import { OrderStatus, PaymentStatus } from "@/lib/generated/prisma/enums";
import { orderConfirmationEmail } from "@/utils/templates";
import { Address } from "@/lib/generated/prisma/client";
import { sendEmail } from "@/utils/nodemailer";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
) => {
  const keySecret = process.env.KEY_SECRET;
  if (!keySecret) {
    throw new Error(
      "Razorpay key secret is not defined in environment variables.",
    );
  }
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  return await prisma.$transaction(async (tx) => {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
      await request.json();

    const userId = request.headers.get("x-user-id");
    const userEmail = request.headers.get("x-user-email");
    if (!userId)
      return NextResponse.json(
        {
          error: "Not authenticated",
        },
        { status: STATUS_CODES.NOT_AUTHENTICATED },
      );

    const order = await tx.order.findFirst({
      where: {
        orderNumber: orderCreationId,
        accountId: Number(userId),
      },
      include: {
        items: true,
      },
    });

    if (!order)
      return NextResponse.json(
        {
          error: "No order found",
        },
        { status: STATUS_CODES.BAD_REQUEST },
      );

    const signature = generatedSignature(orderCreationId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
      await tx.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: PaymentStatus.FAILED,
        },
      });
      return NextResponse.json(
        { error: "payment verification failed" },
        { status: STATUS_CODES.BAD_REQUEST },
      );
    }

    await tx.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: PaymentStatus.PAID,
        status: OrderStatus.CONFIRMED,
      },
    });

    const emailTemplate = orderConfirmationEmail({
      customerName: (order.billingAddress as any).fullName,
      orderId: order.slug,
      total: order.totalAmount,
      shippingAddress: (order.shippingAddress as any).line1,
      orderDate: new Date().toISOString(),
      items: order.items.map((item) => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    });

    await sendEmail(
      userEmail!,
      EMAIL_SUBJECTS.SEND_ORDER_CONFIRMATION,
      emailTemplate,
    );

    return NextResponse.json(
      { message: "payment verified successfully", data: { slug: order.slug } },
      { status: STATUS_CODES.SUCCESS },
    );
  });
}
