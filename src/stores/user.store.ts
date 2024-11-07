import { BusinessByOwnerId } from "@/types/business.types";
import { User } from "@/types/user.types";
import { create, StateCreator } from "zustand";
interface UserSlice {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  token: null,
  setUser: (user: User) => {
    set({ user });
  },
  removeUser: () => {
    set({ user: null });
  },
});

interface BusinessSlice {
  companies: BusinessByOwnerId[];
  activeCompany: BusinessByOwnerId | null;
  setCompanies: (data: BusinessByOwnerId[]) => void;
  setActiveCompany: (company: BusinessByOwnerId) => void;
}

export const createBusinessSlice: StateCreator<BusinessSlice> = (set) => ({
  companies: [],
  activeCompany: null,
  setCompanies: (data: BusinessByOwnerId[]) => {
    set({ companies: data });
  },
  setActiveCompany: (company: BusinessByOwnerId) => {
    set({ activeCompany: company });
  },
});

interface UserBusinessStore extends UserSlice, BusinessSlice {}

export const useUserBusinessStore = create<UserBusinessStore>((...a) => ({
  ...createUserSlice(...a),
  ...createBusinessSlice(...a),
}));
