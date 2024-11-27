import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { sidebarSlice } from "./sidebar";
import { branchSlice } from "./branch";
import { orderSlice } from "./order";
import { landingPageSlice } from "./landing";



const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        sidebar: sidebarSlice.reducer,
        branch: branchSlice.reducer,
        order: orderSlice.reducer,
        landingPage: landingPageSlice.reducer
    }
});

export default store;