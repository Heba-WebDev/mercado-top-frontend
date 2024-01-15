
export interface FormValues {
  user_id: string;
  country: string;
  title: string;
  description: string;
  category_id: number;
  price: number;
  currency: number;
  quantity: number;
  photo_1: File | null;
  photo_2: File | null;
  photo_3: File | null;
}