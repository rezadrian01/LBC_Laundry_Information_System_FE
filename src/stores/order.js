import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderTypeId: null,
        items: [],
        weight: 0,
        totalItems: 0,
        services: []
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
            state.services = [];
        },
        addService: (state, action) => {
            state.services.push(action.payload.service);
        },
        removeService: (state, action) => {
            state.services = state.services.filter(service => service.id !== action.payload.serviceId);
        }
    }
});

export const orderAction = orderSlice.actions;