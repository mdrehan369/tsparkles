import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { STATUS_CODES } from "@/constants";
import { prisma } from "@/lib/prisma";
import { AddressType, OrderStatus } from "@/lib/generated/prisma/enums";
import { generateRandomString } from "@/utils/utilityMethods";

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID!,
  key_secret: process.env.KEY_SECRET,
});

export async function POST(request: NextRequest) {
  return await prisma.$transaction(async (tx) => {
    const userId = request.headers.get("x-user-id");
    if (!userId)
      return NextResponse.json(
        {
          error: "Not Authenticated",
        },
        { status: STATUS_CODES.NOT_AUTHENTICATED },
      );

    const cart = await tx.cart.findFirst({
      where: {
        accountId: Number(userId),
      },
      include: {
        CartItem: {
          include: {
            Product: true,
          },
        },
      },
    });

    if (!cart || cart.CartItem.length == 0)
      return NextResponse.json(
        {
          error: "No cart item found",
        },
        { status: STATUS_CODES.BAD_REQUEST },
      );

    let amount = 0;
    for (const item of cart.CartItem)
      amount += item.quantity * item.Product.price;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "rcp1",
    };
    const order = await razorpay.orders.create(options);

    const shippingAddress = await tx.address.findFirst({
      where: {
        accountId: Number(userId),
        type: AddressType.SHIPPING,
      },
    });

    const billingAddress = await tx.address.findFirst({
      where: {
        accountId: Number(userId),
        type: AddressType.BILLING,
      },
    });

    if (!billingAddress || !shippingAddress)
      return NextResponse.json(
        {
          error: "No address found",
        },
        { status: STATUS_CODES.BAD_REQUEST },
      );

    const createdOrder = await tx.order.create({
      data: {
        accountId: Number(userId),
        status: OrderStatus.PENDING,
        email: request.headers.get("x-user-email")!,
        currency: "INR",
        orderNumber: order.id,
        totalAmount: amount,
        shippingAddress,
        slug: generateRandomString(20),
        billingAddress,
        phoneNumber: billingAddress.phoneNumber,
      },
    });

    for (const item of cart.CartItem) {
      const {
        Product: { title, price, id },
        quantity,
        size,
      } = item;
      await tx.orderItem.create({
        data: {
          price,
          title,
          size,
          quantity,
          orderId: createdOrder.id,
          productId: id,
        },
      });
    }

    return NextResponse.json(
      { orderId: order.id, slug: createdOrder.slug },
      { status: 200 },
    );
  });
}
