import { http } from "./http";

export const createSaleApi = async (payload: any) => {
  const res = await http.post("/sales", payload);
  return res.data;
};

export const getSalesApi = async () => {
  const res = await http.get("/sales");
  return res.data;
};

export const getSaleApi = async (id: string) => {
  const res = await http.get(`/sales/${id}`);
  return res.data;
};

export const getDailySalesApi = async () => {
  const res = await http.get("/sales/daily");
  return res.data;
};
