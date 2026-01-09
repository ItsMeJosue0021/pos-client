import { create } from "zustand";

interface TenantState {
  tenantId: string | null;
  tenantInfo: any | null;

  setTenant: (id: string) => void;
  setTenantInfo: (info: any) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  tenantId: null,
  tenantInfo: null,

  setTenant: (id) => set({ tenantId: id }),
  setTenantInfo: (info) => set({ tenantInfo: info }),
}));
