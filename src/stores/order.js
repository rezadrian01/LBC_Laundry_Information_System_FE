import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderTypeId: null,
        items: [],
        weight: 0,
        quantity: 0,
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
            state.quantity += action.payload.quantity;
        },
        addWeight: (state, action) => {
            state.weight = action.payload.weight;
        },
        addTotalItems: (state, action) => {
            state.quantity += action.payload.quantity;
        },
        addWeightAndQuantity: (state, action) => {
            state.quantity = action.payload.quantity;
            state.weight = action.payload.weight;
        },
        resetOrder: (state, action) => {
            state.orderTypeId = null;
            state.items = [];
            state.weight = 0;
            state.quantity = 0;
            state.services = [];
        },
        addService: (state, action) => {
            state.services.push({ serviceId: action.payload.serviceId });
        },
        removeService: (state, action) => {
            state.services = state.services.filter(service => service.serviceId !== action.payload.serviceId);
        },
    }
});

export const orderAction = orderSlice.actions;