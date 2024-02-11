import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/slice";
import productReducer from "./products/slice"
import productPreview from "./productPreview";
import pagination from "./pagination";
import searchProducts from "./searchProducts"

export const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer,
        productPreviw: productPreview,
        pagination: pagination,
        searchProducts: searchProducts
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;