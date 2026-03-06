import { client } from "@/config/axios.config";

export const getAllCategoriesQuery = async () => {
  try {
    const response = await client.get("/categories");
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
