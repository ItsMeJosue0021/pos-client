import { create } from "zustand";
import { 
    loginApi, 
    logoutApi, 
    meApi 
} from "@/api/auth.api";

interface AuthState {
    user: any | null;
    token: string | null;
    loading: boolean;

    setToken: (token: string | null) => void;
    setUser: (user: any | null) => void;

    login: (email: string, password: string, tenantKey?: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    loading: false,

    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),

    login: async (email, password, tenantKey) => {
        set({ loading: true });
        try {
            const data = await loginApi({ email, password, tenantKey });
            get().setToken(data.accessToken);
            get().setUser(data.user);
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        await logoutApi();
        set({ user: null, token: null });
    },

    fetchUser: async () => {
        set({ loading: true });
        try {
            const data = await meApi();
            set({ user: data });
        } finally {
            set({ loading: false });
        }
    },
}));
