import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface productPrev {
    url: string
}
let initialState: productPrev[] = [];
const productPreview = createSlice({
    name: "productPreview",
    initialState,
    reducers: {
         addProduct: (state, action: PayloadAction<productPrev>) => {
            state.push(action.payload)
            return state;
        },
         removeProduct: (state, action: PayloadAction<string>) => {
            return state.filter(product => product.url !== action.payload);
        },
         emptyProducts: (state, action) => {
            state = []
            return state;
         }
    }
});

export default productPreview.reducer;
export const { addProduct, removeProduct, emptyProducts } = productPreview.actions;