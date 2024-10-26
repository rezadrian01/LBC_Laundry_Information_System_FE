import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { sidebarSlice } from "./sidebar";



const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        sidebar: sidebarSlice.reducer
    }
});

export default store;