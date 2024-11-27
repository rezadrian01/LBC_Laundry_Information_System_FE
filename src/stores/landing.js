import { createSlice } from "@reduxjs/toolkit";

export const landingPageSlice = createSlice({
    name: "landingPage",
    initialState: {
        activeSection: '#home'
    },
    reducers: {
        changeActiveSection: (state, action) => {
            state.activeSection = action.payload.activeSection;
        }
    }
});

export const landingPageAction = landingPageSlice.actions;
