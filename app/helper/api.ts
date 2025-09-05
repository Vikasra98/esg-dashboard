// helper/api.ts
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Example: Fetch Docs Page with icon
export const getDocsPage = async () => {
  try {
    const res = await api.get("/docs-page?populate=docs.icon");
    return res.data;
  } catch (error) {
    console.error("Error fetching docs page:", error);
    throw error;
  }
};

export default api;
