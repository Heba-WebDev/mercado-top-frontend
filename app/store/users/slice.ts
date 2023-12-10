"use client"
import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    user_id: string,
    name: string,
    email: string,
    country: string,
    accessToken: string,
    profile_picture: string
}
// In Next.js, the code inside getInitialProps, getServerSideProps, or getStaticProps
// runs server-side, where localStorage is not available.
// Without the if, you would be seeing an error preventing the app from building
let initialState: User[];
if (typeof window !== 'undefined') {
    initialState = JSON.parse(localStorage.getItem('MTUser') || '[]');
} else {
    initialState = [];
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.push(action.payload);
            localStorage.setItem('MTUser', JSON.stringify(state));
            return state;
        },
        removeUser: (state, action) => {
            state = []
            localStorage.removeItem('MTUser');
            return state;
        }
    }
});

export default usersSlice.reducer;
export const {addUser, removeUser} = usersSlice.actions;
