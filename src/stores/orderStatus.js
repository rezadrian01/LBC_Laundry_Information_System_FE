import { createSlice } from '@reduxjs/toolkit';

export const orderStatusSlice = createSlice({
    name: "orderStatus",
    initialState: {
        activeOrderStatusId: null
    },
    reducers: {
        setActiveOrderStatusId: (state, action) => {
            state.activeOrderStatusId = action.payload
        },

        resetActiveOrderStatusId: (state, action) => {
            state.activeOrderStatusId = null
        }
    }
});

export const orderStatusAction = orderStatusSlice.actions;
