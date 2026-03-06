import { client } from "@/config/axios.config";

export const getCartQuery = async () => {
  try {
    const response = await client.get("/cart");
    return response.data.data.CartItem;
  } catch (error) {
    console.log(error);
    return [];
  }
};
