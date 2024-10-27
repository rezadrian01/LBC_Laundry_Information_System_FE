import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderTypeId: null,
        items: [],
        weight: 0,
        totalItems: 0
    },
    reducers: {
        changeOrderType: (state, action) => {
            state.orderTypeId = action.payload;
        },
        addItem: (state, action) => {
            const newItem = {
                itemServiceId: action.payload.itemServiceId,
                quantity: action.payload.quantity
            };
            state.items.push(newItem);
            state.totalItems += action.payload.quantity;
        },
        addWeight: (state, action) => {
            state.weight = action.payload.weight;
        },
        addTotalItems: (state, action) => {
            state.totalItems += action.payload.totalItems;
        },
        resetOrder: (state, action) => {
            state.orderTypeId = null;
            state.items = [];
            state.weight = 0;
            state.totalItems = 0;
        }
    }
});

export const orderAction = orderSlice.actions;