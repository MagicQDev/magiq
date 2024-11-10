export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      business: {
        Row: {
          address: string | null;
          business_type_id: string;
          created_at: string | null;
          email_contact: string | null;
          google_maps_url: string | null;
          id: string;
          logo_url: string | null;
          name: string;
          nit: string | null;
          owner_id: string;
          phone_contact: string | null;
          primary_color: string;
          secondary_color: string;
          social_fb: string | null;
          social_ig: string | null;
          social_lin: string | null;
          social_tw: string | null;
          updated_at: string | null;
        };
        Insert: {
          address?: string | null;
          business_type_id: string;
          created_at?: string | null;
          email_contact?: string | null;
          google_maps_url?: string | null;
          id?: string;
          logo_url?: string | null;
          name: string;
          nit?: string | null;
          owner_id: string;
          phone_contact?: string | null;
          primary_color?: string;
          secondary_color?: string;
          social_fb?: string | null;
          social_ig?: string | null;
          social_lin?: string | null;
          social_tw?: string | null;
          updated_at?: string | null;
        };
        Update: {
          address?: string | null;
          business_type_id?: string;
          created_at?: string | null;
          email_contact?: string | null;
          google_maps_url?: string | null;
          id?: string;
          logo_url?: string | null;
          name?: string;
          nit?: string | null;
          owner_id?: string;
          phone_contact?: string | null;
          primary_color?: string;
          secondary_color?: string;
          social_fb?: string | null;
          social_ig?: string | null;
          social_lin?: string | null;
          social_tw?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "business_business_type_id_fkey";
            columns: ["business_type_id"];
            isOneToOne: false;
            referencedRelation: "business_type";
            referencedColumns: ["id"];
          }
        ];
      };
      business_orders: {
        Row: {
          business_id: string;
          created_at: string | null;
          id: string;
          order_products_id: string;
          price_total: number;
          status: string;
          updated_at: string | null;
        };
        Insert: {
          business_id: string;
          created_at?: string | null;
          id?: string;
          order_products_id: string;
          price_total: number;
          status: string;
          updated_at?: string | null;
        };
        Update: {
          business_id?: string;
          created_at?: string | null;
          id?: string;
          order_products_id?: string;
          price_total?: number;
          status?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "business_orders_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "business";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "business_orders_order_products_id_fkey";
            columns: ["order_products_id"];
            isOneToOne: false;
            referencedRelation: "order_products";
            referencedColumns: ["id"];
          }
        ];
      };
      business_payment_methods: {
        Row: {
          account_number: string;
          created_at: string | null;
          id: string;
          payment_method_id: string;
          updated_at: string | null;
        };
        Insert: {
          account_number: string;
          created_at?: string | null;
          id?: string;
          payment_method_id: string;
          updated_at?: string | null;
        };
        Update: {
          account_number?: string;
          created_at?: string | null;
          id?: string;
          payment_method_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "business_payment_methods_payment_method_id_fkey";
            columns: ["payment_method_id"];
            isOneToOne: false;
            referencedRelation: "master_payment_methods";
            referencedColumns: ["id"];
          }
        ];
      };
      business_products: {
        Row: {
          business_id: string;
          category_id: string;
          created_at: string | null;
          description: string;
          id: string;
          image_url: string | null;
          is_active: boolean;
          name: string;
          price: number;
          stock: number;
          updated_at: string | null;
        };
        Insert: {
          business_id: string;
          category_id?: string;
          created_at?: string | null;
          description?: string;
          id?: string;
          image_url?: string | null;
          is_active?: boolean;
          name: string;
          price: number;
          stock?: number;
          updated_at?: string | null;
        };
        Update: {
          business_id?: string;
          category_id?: string;
          created_at?: string | null;
          description?: string;
          id?: string;
          image_url?: string | null;
          is_active?: boolean;
          name?: string;
          price?: number;
          stock?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "business_products_business_id_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "business";
            referencedColumns: ["id"];
          }
        ];
      };
      business_type: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          auth_id: string | null;
          birth_date: string | null;
          created_at: string | null;
          gender: string | null;
          height: number | null;
          id: string;
          id_type: string;
          idnumer: string;
          updated_at: string | null;
          weight: number | null;
          wp_numer: string | null;
        };
        Insert: {
          auth_id?: string | null;
          birth_date?: string | null;
          created_at?: string | null;
          gender?: string | null;
          height?: number | null;
          id?: string;
          id_type: string;
          idnumer: string;
          updated_at?: string | null;
          weight?: number | null;
          wp_numer?: string | null;
        };
        Update: {
          auth_id?: string | null;
          birth_date?: string | null;
          created_at?: string | null;
          gender?: string | null;
          height?: number | null;
          id?: string;
          id_type?: string;
          idnumer?: string;
          updated_at?: string | null;
          weight?: number | null;
          wp_numer?: string | null;
        };
        Relationships: [];
      };
      feature: {
        Row: {
          active: boolean;
          app_url: string;
          created_at: string | null;
          description: string | null;
          icon: string;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          active?: boolean;
          app_url: string;
          created_at?: string | null;
          description?: string | null;
          icon: string;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          active?: boolean;
          app_url?: string;
          created_at?: string | null;
          description?: string | null;
          icon?: string;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      feature_business_type: {
        Row: {
          business_type_id: string;
          created_at: string | null;
          feature_id: string;
          id: string;
          position: number;
          updated_at: string | null;
        };
        Insert: {
          business_type_id: string;
          created_at?: string | null;
          feature_id: string;
          id?: string;
          position?: number;
          updated_at?: string | null;
        };
        Update: {
          business_type_id?: string;
          created_at?: string | null;
          feature_id?: string;
          id?: string;
          position?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "feature_business_type_business_type_id_fkey";
            columns: ["business_type_id"];
            isOneToOne: false;
            referencedRelation: "business_type";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "feature_business_type_feature_id_fkey";
            columns: ["feature_id"];
            isOneToOne: false;
            referencedRelation: "feature";
            referencedColumns: ["id"];
          }
        ];
      };
      master_payment_methods: {
        Row: {
          created_at: string | null;
          id: string;
          logo_url: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          logo_url: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          logo_url?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      order_products: {
        Row: {
          business_product_id: string;
          created_at: string | null;
          customer_id: string;
          fprice_total: number | null;
          fprice_unit: number | null;
          id: string;
          payment_method_id: string | null;
          quantity: number;
          status: string | null;
          updated_at: string | null;
        };
        Insert: {
          business_product_id: string;
          created_at?: string | null;
          customer_id: string;
          fprice_total?: number | null;
          fprice_unit?: number | null;
          id?: string;
          payment_method_id?: string | null;
          quantity?: number;
          status?: string | null;
          updated_at?: string | null;
        };
        Update: {
          business_product_id?: string;
          created_at?: string | null;
          customer_id?: string;
          fprice_total?: number | null;
          fprice_unit?: number | null;
          id?: string;
          payment_method_id?: string | null;
          quantity?: number;
          status?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "order_products_business_product_id_fkey";
            columns: ["business_product_id"];
            isOneToOne: false;
            referencedRelation: "business_products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_products_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "business_payment_methods";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_products_payment_method_id_fkey";
            columns: ["payment_method_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
