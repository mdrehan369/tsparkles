import { STATUS_CODES } from "@/constants";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
      where: {
        slug,
        isPublished: true,
      },
      include: {
        Asset: true,
        Category: true,
        SubCategory: true,
        Review: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found", success: false },
        { status: STATUS_CODES.NOT_FOUND },
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: "Fetched!",
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR },
    );
  }
}
