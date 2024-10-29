interface User {
  id: number;
  name: string;
  email: string;
  plan_desc?: string;
  created_at?: Date;
  updated_at?: Date;
}
export type { User };
