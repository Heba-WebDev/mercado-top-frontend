
export type ICreateProduct = {
    user_id: string,
    country: string,
    title: string,
    description: string,
    category_id: number,
    photo_1: File | null,
    photo_2: File | null,
    photo_3: File | null,
    price: number,
    quantity: number,
    currency: number,
    [key: string]: any;
}