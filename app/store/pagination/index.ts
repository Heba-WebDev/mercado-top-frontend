import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface paginationOb {
    limit: number,
    page: number,
}

const initialState = {
    limit: 5,
    page: 1,
};

const pagination = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setLimit: (state, action: PayloadAction<paginationOb>) => {
            state.limit = action.payload.limit;
            state.page = action.payload.page;
            return state;
        }
    }
});


export default pagination.reducer;
export const { setLimit } = pagination.actions;

