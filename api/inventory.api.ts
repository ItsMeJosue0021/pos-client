import { http } from "./http";

export const getInventoryApi = async () => {
  const res = await http.get("/inventory");
  return res.data;
};

export const stockInApi = async (payload: any) => {
  const res = await http.post("/inventory/stock-in", payload);
  return res.data;
};

export const stockOutApi = async (payload: any) => {
  const res = await http.post("/inventory/stock-out", payload);
  return res.data;
};

export const getLowStockApi = async () => {
  const res = await http.get("/inventory/low-stock");
  return res.data;
};
