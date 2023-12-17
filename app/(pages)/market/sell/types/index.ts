
export type ICreateProduct = {
    user_id: string,
    country: string,
    title: string,
    description: string,
    category_id: number,
    photo_1: File | null,
    price: number,
    currency: number,
    [key: string]: any;
}