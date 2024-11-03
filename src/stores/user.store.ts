import { CompanyByOwnerId } from "@/types/company.types";
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
  companies: CompanyByOwnerId[];
  activeCompany: CompanyByOwnerId | null;
  setCompanies: (data: CompanyByOwnerId[]) => void;
  setActiveCompany: (company: CompanyByOwnerId) => void;
}

export const createCompanySlice: StateCreator<CompanySlice> = (set) => ({
  companies: [],
  activeCompany: null,
  setCompanies: (data: CompanyByOwnerId[]) => {
    set({ companies: data });
  },
  setActiveCompany: (company: CompanyByOwnerId) => {
    set({ activeCompany: company });
  },
});

interface UserCompanyStore extends UserSlice, CompanySlice {}

export const useUserCompanyStore = create<UserCompanyStore>((...a) => ({
  ...createUserSlice(...a),
  ...createCompanySlice(...a),
}));
