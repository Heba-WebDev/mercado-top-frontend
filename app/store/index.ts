import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/slice";
import productReducer from "./products/slice"
import productPreview from "./productPreview";

export const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer,
        productPreviw: productPreview
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;