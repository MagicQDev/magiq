interface BusinessByOwnerId {
  id: string;
  name: string;
  owner_id: string;
  nit?: string;
  logo_url?: string;
  google_maps_url?: string;
  email_contact?: string;
  phone_contact?: string;
  address?: string;
  social_fb?: string;
  social_ig?: string;
  social_tw?: string;
  social_lin?: string;
  primary_color: string;
  secondary_color: string;
  business_type: {
    id: string;
    name: string;
    features: {
      id: string;
      position: number;
      data: {
        name: string;
        description?: string;
        app_url: string;
        icon: string;
        active: boolean;
      };
    }[];
  };
}
export type { BusinessByOwnerId };
