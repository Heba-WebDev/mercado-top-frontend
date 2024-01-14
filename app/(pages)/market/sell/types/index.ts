
export type ICreateProduct = {
    user_id: string,
    country: string,
    title: string,
    description: string,
    category_id: number,
    photos: File[] | null,
    price: number,
    currency: number,
    [key: string]: any;
}