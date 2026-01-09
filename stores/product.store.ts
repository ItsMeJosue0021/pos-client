import { create } from "zustand";
import {
  getProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "@/api/products.api";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
}

interface ProductStore {
  products: Product[];
  loading: boolean;

  fetchProducts: () => Promise<void>;
  createProduct: (payload: any) => Promise<void>;
  updateProduct: (id: string, payload: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const data = await getProductsApi();
      set({ products: data });
    } finally {
      set({ loading: false });
    }
  },

  createProduct: async (payload) => {
    await createProductApi(payload);
    await get().fetchProducts();
  },

  updateProduct: async (id, payload) => {
    await updateProductApi(id, payload);
    await get().fetchProducts();
  },

  deleteProduct: async (id) => {
    await deleteProductApi(id);
    await get().fetchProducts();
  },
}));
