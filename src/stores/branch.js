import { createSlice } from "@reduxjs/toolkit";

export const branchSlice = createSlice({
    name: "branch",
    initialState: {
        activeBranch: {
            id: localStorage.getItem("activeBranchId") || "",
            name: localStorage.getItem("activeBranchName") || "",
            address: localStorage.getItem("activeBranchAddress") || ""
        },
        activeReportBranch: {
            id: 1,
            name: "Blimbing",
            address: "Jln. Blimbing"
        }
    },
    reducers: {
        changeActiveBranch: (state, action) => {
            state.activeBranch = { ...action.payload };
        },
        resetActiveBranch: (state, action) => {
            state.activeBranch.id = null;
            state.activeBranch.name = null;
            state.activeBranch.address = null;
        }
    }
});

export const branchAction = branchSlice.actions;