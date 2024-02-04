"use client"
import axios from "axios";
import { RootState } from "..";
import { ApiAxiosInterceptor } from "@/app/react-query/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
import { Root } from "postcss";


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
    totalPages: number,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
//  The initial state, before any fetch operation has started is idle
const initialState: ProductsState = {
    products: [],
    totalPages: 0,
    status: 'idle',
    error: null
}

// products/fetchProducts is not an actual API endpoint,
// but rather an identifier for the asynchronous action within Redux Toolkit
export const fetchProducts = createAsyncThunk('products/fetchProducts',
async (_, { getState }) => {
  const state = getState() as RootState;
  const {limit, page} = state.pagination;
  const response = await ApiAxiosInterceptor.get(`/api/products`, {
    params: {
        limit,
        page
    }
  });
  return {products: response.data, totalPages: response.data.totalPages};
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
            .addCase(fetchProducts.fulfilled,
                (state, action: PayloadAction<{products: Product[], totalPages: number}>) => {
                state.status = 'succeeded';
                // Add any fetched products to the array
                state.products = []
                state.products = state.products.concat(action.payload.products);
                state.totalPages = action.payload.totalPages
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            });
    },
});

export default productSlice.reducer;

