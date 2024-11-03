interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan_desc?: string;
  created_at?: Date;
  updated_at?: Date;
}
export type { User };
