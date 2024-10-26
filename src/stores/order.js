const { createSlice } = require("@reduxjs/toolkit");

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        "type": null
    },
    reducers: {
        changeorderType: (state, action) => {
            state.type = action.order;
        }
    }
});

export const orderAction = orderSlice.actions;