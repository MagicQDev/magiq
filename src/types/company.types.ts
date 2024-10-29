interface Contact {
  email: string;
  phone: string;
  direction: string;
}
interface SocialNetworks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}
interface CompanyType {
  _id: string;
  name: string;
  description: string;
  public?: boolean;
  features: string[];
  created_at?: Date;
  updated_at?: Date;
}

interface Contact {
  email: string;
  phone: string;
  direction: string;
}
interface SocialNetworks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}
interface CompanyType {
  _id: string;
  name: string;
  description: string;
  public?: boolean;
  features: string[];
  created_at?: Date;
  updated_at?: Date;
}
interface Company {
  _id: string;
  owner_id: number;
  company_type: CompanyType;
  name: string;
  nit?: string;
  logo_url?: string;
  google_maps_url?: string;
  contact?: Partial<Contact>;
  social_networks?: Partial<SocialNetworks>;
  config?: {
    primary_color?: string;
    secondary_color?: string;
  };
  created_at?: Date;
  updated_at?: Date;
}
export type { Company, CompanyType, Contact, SocialNetworks };
