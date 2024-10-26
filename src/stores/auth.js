import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        token: null,
        role: 'employee'
    },
    reducers: {
        signin: (state, action) => {
            state.userId = localStorage.getItem('userId');
            state.token = localStorage.getItem('token');
            state.role = action.role;
        },
        signout: (state, action) => {
            state.userId = null;
            state.token = null;
            state.role = null;
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
        }
    }
});


export const authAction = authSlice.actions;
