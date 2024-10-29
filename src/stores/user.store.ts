import { getCompanyByOwnerId } from "@/services/company/company";
import { Company } from "@/types/company.types";
import { User } from "@/types/user.types";
import { create, StateCreator } from "zustand";
interface UserSlice {
  user: User | null;
  token: string | null;
  userLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => void;
  logout: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  token: null,
  userLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ userLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      /*
        const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const { user, token } = await response.json();
        */
      console.log("Login success", email, password);
      const user: User = {
        id: 123,
        name: "shadcn",
        email: "arteagaemer@gmail.com",
      };
      set({ user, token: "TOKEN", userLoading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      set({ error: message, userLoading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null });
  },
});

interface CompanySlice {
  companyLoading: boolean;
  companies: Company[];
  activeCompany: Company | null;
  setCompanies: (owner_id: number) => void;
  setActiveCompany: (company: Company) => void;
}

export const createCompanySlice: StateCreator<CompanySlice> = (set) => ({
  companies: [],
  activeCompany: null,
  companyLoading: false,
  setCompanies: async (owner_id: number) => {
    set({ companyLoading: true });
    const res = await getCompanyByOwnerId(owner_id);
    if (res && res.length > 0) {
      set({ companies: res });
      set({ activeCompany: res[0] });
    } else {
      set({ companies: [] });
    }
    set({ companyLoading: false });
    // fetch companies
  },
  setActiveCompany: (company: Company) => {
    set({ activeCompany: company });
  },
});

interface UserCompanyStore extends UserSlice, CompanySlice {}

export const useUserCompanyStore = create<UserCompanyStore>((...a) => ({
  ...createUserSlice(...a),
  ...createCompanySlice(...a),
}));
