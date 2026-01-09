import { http } from "./http";

export const getProductsApi = async () => {
  const res = await http.get("/products");
  return res.data;
};

export const getProductApi = async (id: string) => {
  const res = await http.get(`/products/${id}`);
  return res.data;
};

export const createProductApi = async (payload: any) => {
  const res = await http.post("/products", payload);
  return res.data;
};

export const updateProductApi = async (id: string, payload: any) => {
  const res = await http.put(`/products/${id}`, payload);
  return res.data;
};

export const deleteProductApi = async (id: string) => {
  const res = await http.delete(`/products/${id}`);
  return res.data;
};
