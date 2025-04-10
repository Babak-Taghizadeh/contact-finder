export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  gender: string;
  phone: string;
  note: string;
  telegram: string | null;
  avatar: string | null;
  company: string | null;
  address: string | null;
  createdAt: number;
  updatedAt: number;
}
