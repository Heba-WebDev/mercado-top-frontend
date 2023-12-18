"use client"
import axios from "axios";
import { ApiAxiosInterceptor } from "@/app/react-query/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

export interface ProductObj {
    product_id: string,
    user_id: string,
    user_name: string,
    country: string,
    category_id: number,
    currency_id: number,
    title: string,
    description: string,
    price: string,
    photo_1: string,
    photo_2: null,
    photo_3: null,
    posted_at: string | null,
    is_active: null
}
export interface Product {
    data: ProductObj[]
}

// ProductsState interface is used to define the shape of the state for
// the products slice in the Redux store
export interface ProductsState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
//  The initial state, before any fetch operation has started is idle
const initialState: ProductsState = {
    products: [],
    status: 'idle',
    error: null
}

// products/fetchProducts is not an actual API endpoint,
// but rather an identifier for the asynchronous action within Redux Toolkit
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await ApiAxiosInterceptor.get('/api/products');
  return response.data;
});


export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductObj>) => {
            state.products.push({data: [action.payload]});
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                // Add any fetched products to the array
                state.products = []
                state.products = state.products.concat(action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            });
    },
});

export default productSlice.reducer;

