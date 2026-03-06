import { STATUS_CODES } from "@/constants";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId)
      return NextResponse.json(
        {
          error: "User not authenticated",
          data: null,
        },
        { status: STATUS_CODES.NOT_AUTHENTICATED },
      );
    const cart = await prisma.cart.findFirst({
      where: { accountId: Number(userId) },
      include: {
        CartItem: {
          include: {
            Product: {
              include: {
                Asset: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        error: null,
        data: cart,
      },
      { status: STATUS_CODES.SUCCESS },
    );
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 },
    );
  }
}
