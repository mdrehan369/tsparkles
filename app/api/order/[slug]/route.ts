import { STATUS_CODES } from "@/constants";
import { PaymentStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const order = await prisma.order.findFirst({
      where: {
        slug,
      },
    });

    if (!order)
      return NextResponse.json(
        {
          error: "No order found",
        },
        { status: STATUS_CODES.BAD_REQUEST },
      );

    if (order.paymentStatus !== PaymentStatus.PAID)
      return NextResponse.json(
        {
          error: "Payment not completed",
        },
        { status: STATUS_CODES.BAD_REQUEST },
      );

    return NextResponse.json(
      {
        message: "Order placed successfully!",
        data: order,
      },
      { status: STATUS_CODES.SUCCESS },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: err,
        message: "Some error occured",
      },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR },
    );
  }
}
