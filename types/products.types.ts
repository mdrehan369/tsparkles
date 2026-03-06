import { Prisma } from "@/lib/generated/prisma/client";

export type ProductWithAssetReview = Prisma.ProductGetPayload<{
  include: { Asset: true; Review: true };
}>;

export type FullProduct = Prisma.ProductGetPayload<{
  include: { Asset: true; Review: true; SubCategory: true; Category: true };
}>;
