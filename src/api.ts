import axios from 'axios';

const API_URL = 'https://your-api-url.com';

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const addProduct = async (product: { name: string; description: string; price: number; category: string }) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  await axios.delete(`${API_URL}/products/${id}`);
};
