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
interface CompanyByOwnerId {
  id: number;
  name: string;
  owner_id: number;
  nit: string;
  logo_url: string;
  google_maps_url: string;
  email_contact: string;
  phone_contact: string;
  address: string;
  social_fb: string;
  social_ig: string;
  social_tw: string;
  social_lin: string;
  primary_color: string;
  secondary_color: string;
  business_type: {
    id: number;
    name: string;
    features: {
      id: number;
      position: number;
      data: {
        name: string;
        description: string;
        app_url: string;
        icon: string;
        active: boolean;
      };
    }[];
  };
}
export type { Company, CompanyByOwnerId, CompanyType, Contact, SocialNetworks };
