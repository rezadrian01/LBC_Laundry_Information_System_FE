import { createSlice } from "@reduxjs/toolkit";

export const branchSlice = createSlice({
    name: "branch",
    initialState: {
        activeBranch: {
            id: 1,
            name: "Blimbing",
            address: "Jln. Blimbing"
        }
    },
    reducers: {
        changeBranch: (state, action) => {
            state.activeBranch = { ...action.payload };
        }
    }
});

export const branchAction = branchSlice.actions;