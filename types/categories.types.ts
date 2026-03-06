import { Prisma } from "@/lib/generated/prisma/client";

export type CategoryWithSubCategory = Prisma.CategoryGetPayload<{ include: { SubCategory: true } }
