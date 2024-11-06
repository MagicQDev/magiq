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

interface CompanySlice {
  companies: BusinessByOwnerId[];
  activeCompany: BusinessByOwnerId | null;
  setCompanies: (data: BusinessByOwnerId[]) => void;
  setActiveCompany: (company: BusinessByOwnerId) => void;
}

export const createCompanySlice: StateCreator<CompanySlice> = (set) => ({
  companies: [],
  activeCompany: null,
  setCompanies: (data: BusinessByOwnerId[]) => {
    set({ companies: data });
  },
  setActiveCompany: (company: BusinessByOwnerId) => {
    set({ activeCompany: company });
  },
});

interface UserCompanyStore extends UserSlice, CompanySlice {}

export const useUserCompanyStore = create<UserCompanyStore>((...a) => ({
  ...createUserSlice(...a),
  ...createCompanySlice(...a),
}));
