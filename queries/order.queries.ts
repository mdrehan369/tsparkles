import { client } from "@/config/axios.config";

export const getOrderStatusQuery = async (slug: string) => {
  try {
    const response = await client.get(`/order/${slug}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
