import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
  total: number;

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) => {
    const items = get().items;
    const existing = items.find((i) => i.id === item.id);

    let updated;

    if (existing) {
      updated = items.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      updated = [...items, { ...item, qty: 1 }];
    }

    set({
      items: updated,
      total: updated.reduce((sum, x) => sum + x.price * x.qty, 0),
    });
  },

  removeItem: (id) => {
    const updated = get().items.filter((i) => i.id !== id);
    set({
      items: updated,
      total: updated.reduce((sum, x) => sum + x.price * x.qty, 0),
    });
  },

  increaseQty: (id) => {
    const updated = get().items.map((i) =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    );

    set({
      items: updated,
      total: updated.reduce((sum, x) => sum + x.price * x.qty, 0),
    });
  },

  decreaseQty: (id) => {
    const updated = get().items
      .map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
      )
      .filter((i) => i.qty > 0);

    set({
      items: updated,
      total: updated.reduce((sum, x) => sum + x.price * x.qty, 0),
    });
  },

  clearCart: () => set({ items: [], total: 0 }),
}));
