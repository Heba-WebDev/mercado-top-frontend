import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/slice";
import productReducer from "./products/slice"

export const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;