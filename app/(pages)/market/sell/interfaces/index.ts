
export interface FormValues {
  user_id: string;
  country: string;
  title: string;
  description: string;
  category_id: number;
  price: number;
  currency: number;
  photos: File[] | null;
}