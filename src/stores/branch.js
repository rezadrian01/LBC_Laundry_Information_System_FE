const { createSlice } = require("@reduxjs/toolkit");

export const branchSlice = createSlice({
    name: "branch",
    initialState: {
        activeBranchId: 1
    },
    reducers: {
        changeBranch: (state, action) => {
            state.activeBranchId = action.branchId;
        }
    }
});

export const branchAction = branchSlice.actions;