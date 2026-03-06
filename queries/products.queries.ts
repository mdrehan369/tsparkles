import { client } from "@/config/axios.config";
import { Product } from "@/lib/generated/prisma/client";

export const getAllProductsQuery = async ({
  page,
  limit,
  categoryId,
  subCategoryId,
}: {
  page?: number;
  limit?: number;
  categoryId?: number | string;
  subCategoryId?: number | string;
}) => {
  try {
    const response = await client.get("/products", {
      params: {
        page,
        limit,
        categoryId: categoryId || undefined,
        subCategoryId: subCategoryId || undefined,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: Product["slug"]) => {
  try {
    const response = await client.get(`/products/${slug}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
