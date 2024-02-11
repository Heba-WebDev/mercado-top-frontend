import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ApiAxiosInterceptor } from "@/app/react-query/axios";

export interface search {
    category: string;
    country: string;
}

const initialState = {
    category: "",
    country: "",
}
export const fetchProductsByCategoryLocation = createAsyncThunk('products/filterProducts',
async (_, {getState}) => {
const state = getState() as RootState;
const { category, country } = state.searchProducts;
try {
      const response = await ApiAxiosInterceptor.post("/api/products/byCategoryLocation", {
        category: "Books",
        country: "",
      });
      console.log(response);
    } catch (error) {
      console.log(error) ;
    }
  
});

const searchProducts = createSlice({
    name: "searchProducts",
    initialState,
    reducers: {
        setSearchCategoryLocation: (state, action: PayloadAction<search>) => {
            state.category = action.payload.category;
            state.country = action.payload.country;
            return state;
        }
    }
});

export default searchProducts.reducer;
export const { setSearchCategoryLocation } = searchProducts.actions;
