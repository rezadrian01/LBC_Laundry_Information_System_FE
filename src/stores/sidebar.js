import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isOpen: false
    },
    reducers: {
        toggleSidebar: (state, action) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export const sidebarAction = sidebarSlice.actions;