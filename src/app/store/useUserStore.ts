import { create } from "zustand";

interface UserState {
  id: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (id: string, email: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  email: null,
  isAuthenticated: false,
  login: (id, email) => set({ id, email, isAuthenticated: true }),
  logout: () => set({ id: null, email: null, isAuthenticated: false }),
}));
