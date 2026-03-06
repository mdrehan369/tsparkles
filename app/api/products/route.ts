import { ProductWhereInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";
import { getPaginationQuery } from "@/utils/utilityMethods";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    const subCategoryId = searchParams.get("subCategoryId");

    const { limit, page } = getPaginationQuery(request);

    const where: ProductWhereInput = {
      isPublished: true,
    };

    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }
    if (subCategoryId) {
      where.subCategoryId = parseInt(subCategoryId);
    }

    const totalProducts = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await prisma.product.findMany({
      where,
      include: {
        Asset: {
          where: {
            type: "IMAGE",
          },
          take: 1,
        },
        Category: true,
        SubCategory: true,
        Review: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: { products, totalPages },
      message: "Fetched!",
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
