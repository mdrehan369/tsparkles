import { client } from "@/config/axios.config";

export const getRecentAddressQuery = async () => {
  try {
    const response = await client.get("/address");
    return response.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
