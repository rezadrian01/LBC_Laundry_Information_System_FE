import { createSlice } from "@reduxjs/toolkit";

export const branchSlice = createSlice({
    name: "branch",
    initialState: {
        activeBranchId: 1
    },
    reducers: {
        changeBranch: (state, action) => {
            state.activeBranchId = action.payload;
        }
    }
});

export const branchAction = branchSlice.actions;